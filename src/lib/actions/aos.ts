import {
	aosAction as baseAosAction,
	AOS as SvelteAOS,
	type AOSOptions,
	type AnimationType,
	type EasingType
} from 'svelte-aos';

export type AOSElementOptions = {
	animation?: AnimationType;
	duration?: number;
	delay?: number;
	easing?: EasingType;
	once?: boolean;
	distance?: string;
};

/**
 * Svelte action to animate elements on scroll using AOS Svelte (svelte-aos).
 * Reads options from directive parameters or from data-aos-* HTML attributes.
 */
export function aosAction(node: HTMLElement, options?: AOSElementOptions) {
	// Parse fallback attributes from the DOM element if not explicitly passed
	const animation = options?.animation || (node.getAttribute('data-aos') as AnimationType) || 'fade-up';
	const durationAttr = node.getAttribute('data-aos-duration');
	const duration = options?.duration ?? (durationAttr ? parseInt(durationAttr, 10) : undefined);
	const delayAttr = node.getAttribute('data-aos-delay');
	const delay = options?.delay ?? (delayAttr ? parseInt(delayAttr, 10) : undefined);
	const easingAttr = node.getAttribute('data-aos-easing');
	const easing = options?.easing || (easingAttr as EasingType) || undefined;
	const onceAttr = node.getAttribute('data-aos-once');
	const once = options?.once ?? (onceAttr !== null ? onceAttr !== 'false' : undefined);

	let actionInstance: { update?: (opt?: AOSElementOptions) => void; destroy?: () => void } | undefined;

	if (typeof window !== 'undefined') {
		// Run on next animation frame after <AOS /> component has mounted and initialized
		requestAnimationFrame(() => {
			actionInstance = baseAosAction(node, {
				animation,
				duration,
				delay,
				easing,
				once
			});
		});
	}

	return {
		update(newOptions?: AOSElementOptions) {
			actionInstance?.update?.(newOptions);
		},
		destroy() {
			actionInstance?.destroy?.();
		}
	};
}

export { SvelteAOS as AOS };
export type { AnimationType, EasingType, AOSOptions };
