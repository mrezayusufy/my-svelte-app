/**
 * Lightweight allowlist-based HTML sanitizer.
 * Works in any JS runtime (Node, Cloudflare Workers, browser) — no DOM required.
 *
 * Strategy:
 *  1. Strip <script>, <style>, <iframe>, <object>, <embed>, <form> blocks entirely.
 *  2. Walk every remaining tag and:
 *     - If the tag name is NOT on the allowlist → strip the tag (keep inner text).
 *     - If the tag IS allowed → keep it but scrub every attribute through the
 *       attribute allowlist, removing dangerous values (javascript:, data:, on*).
 */

/** Tags we keep — everything else is stripped (content is kept). */
const ALLOWED_TAGS = new Set([
	'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
	'p', 'br', 'hr',
	'strong', 'b', 'em', 'i', 'u', 's', 'mark', 'small',
	'ul', 'ol', 'li',
	'dl', 'dt', 'dd',
	'blockquote', 'cite', 'q',
	'span', 'div', 'section', 'article',
	'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption',
	'a', 'abbr', 'time',
]);

/** Per-tag allowed attributes (also checked against SAFE_ATTRS_GLOBAL). */
const ALLOWED_ATTRS_PER_TAG: Record<string, Set<string>> = {
	a: new Set(['href', 'title', 'target', 'rel']),
	time: new Set(['datetime']),
	abbr: new Set(['title']),
	td: new Set(['colspan', 'rowspan']),
	th: new Set(['colspan', 'rowspan', 'scope']),
};

/** Attributes allowed on ANY element. */
const SAFE_ATTRS_GLOBAL = new Set(['class', 'id', 'lang', 'dir']);

/** Regex that matches a full HTML tag: opening, closing, or self-closing. */
const TAG_REGEX = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)((?:\s[^>]*?)?)(\/?)>/g;

/** Regex matching event-handler attributes or javascript:/data: values. */
const DANGEROUS_ATTR_VALUE = /^\s*javascript:/i;
const DATA_URI_EXCEPT_IMAGE = /^\s*data:(?!image\/(png|jpeg|gif|webp|svg\+xml))/i;

/** Block-level tags whose content we completely nuke. */
const BLOCK_STRIP_RE =
	/<(script|style|iframe|object|embed|form|input|button|select|textarea)\b[\s\S]*?<\/\1>/gi;

/** Strip comments. */
const COMMENT_RE = /<!--[\s\S]*?-->/g;

function isSafeHref(value: string): boolean {
	const v = value.trim().toLowerCase();
	if (DANGEROUS_ATTR_VALUE.test(v)) return false;
	if (DATA_URI_EXCEPT_IMAGE.test(v)) return false;
	return true;
}

function sanitizeAttrs(tagName: string, rawAttrs: string): string {
	if (!rawAttrs.trim()) return '';

	const perTag = ALLOWED_ATTRS_PER_TAG[tagName] ?? new Set<string>();
	const result: string[] = [];

	// Match key="value", key='value', or bare key
	const attrRe = /([a-zA-Z][a-zA-Z0-9_:-]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|(\S+)))?/g;
	let m: RegExpExecArray | null;

	while ((m = attrRe.exec(rawAttrs)) !== null) {
		const name = m[1].toLowerCase();
		const value = m[2] ?? m[3] ?? m[4] ?? '';

		// Block event handlers (on*)
		if (/^on/i.test(name)) continue;

		// Only keep allowed attrs
		if (!SAFE_ATTRS_GLOBAL.has(name) && !perTag.has(name)) continue;

		// Extra href safety
		if (name === 'href' && !isSafeHref(value)) continue;

		// Force external links to be safe
		if (name === 'target' && value !== '_blank') continue;

		if (m[2] !== undefined) result.push(`${name}="${value}"`);
		else if (m[3] !== undefined) result.push(`${name}='${value}'`);
		else if (m[4] !== undefined) result.push(`${name}="${value}"`);
		else result.push(name);
	}

	// Auto-add rel for external links
	if (tagName === 'a' && result.some((a) => a.startsWith('target'))) {
		if (!result.some((a) => a.startsWith('rel'))) {
			result.push('rel="noopener noreferrer"');
		}
	}

	return result.length ? ' ' + result.join(' ') : '';
}

export function sanitizeHtml(dirty: string | null | undefined): string {
	if (!dirty) return '';

	let clean = dirty
		.replace(COMMENT_RE, '')         // strip HTML comments
		.replace(BLOCK_STRIP_RE, '');    // strip dangerous block elements

	clean = clean.replace(
		TAG_REGEX,
		(_full, slash: string, tag: string, attrs: string, selfClose: string) => {
			const tagLower = tag.toLowerCase();

			if (!ALLOWED_TAGS.has(tagLower)) {
				// Strip the tag entirely but keep its inner content (for inline wrappers)
				return '';
			}

			const safeAttrs = sanitizeAttrs(tagLower, attrs);
			const sc = selfClose ? ' /' : '';
			return `<${slash}${tagLower}${safeAttrs}${sc}>`;
		}
	);

	return clean.trim();
}
