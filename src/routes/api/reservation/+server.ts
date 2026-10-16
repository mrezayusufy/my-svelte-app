import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY } from '$env/static/public';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const payload = (await request.json()) as Record<string, any>;

		const { name, phone, email, guests, date, time, message } = payload;

		if (!name || !phone) {
			return json(
				{ success: false, error: 'Name und Telefonnummer sind erforderlich.' },
				{ status: 400 }
			);
		}

		const reqData = {
			name: String(name).trim(),
			phone: String(phone).trim(),
			date: String(date || '').trim(),
			time: String(time || '').trim(),
			guests: Number(guests) || 2,
			note: message ? (email ? `${message} (Email: ${email})` : message) : (email ? `Email: ${email}` : undefined),
			message: message ? (email ? `${message} (Email: ${email})` : message) : (email ? `Email: ${email}` : undefined)
		};

		const headers = {
			'Content-Type': 'application/json',
			'apikey': PUBLIC_SUPABASE_PUBLISHABLE_KEY,
			'Authorization': `Bearer ${PUBLIC_SUPABASE_PUBLISHABLE_KEY}`
		};

		// 1. Try telegram-notify-reservation endpoint
		let edgeResponse = await fetch(`${PUBLIC_SUPABASE_URL}/functions/v1/telegram-notify-reservation`, {
			method: 'POST',
			headers,
			body: JSON.stringify(reqData)
		});

		// 2. If telegram-notify-reservation failed, try quick-action
		if (!edgeResponse.ok) {
			console.warn('telegram-notify-reservation returned status', edgeResponse.status, 'trying quick-action...');
			const fallbackResponse = await fetch(`${PUBLIC_SUPABASE_URL}/functions/v1/quick-action`, {
				method: 'POST',
				headers,
				body: JSON.stringify(reqData)
			});

			if (fallbackResponse.ok) {
				edgeResponse = fallbackResponse;
			}
		}

		const result = (await edgeResponse.json().catch(() => null)) as Record<string, any> | null;

		if (!edgeResponse.ok) {
			console.error('Supabase Edge Function responded with error:', edgeResponse.status, result);
			return json(
				{
					success: false,
					error:
						result?.error ||
						result?.message ||
						`Supabase Edge Function returned status ${edgeResponse.status}`
				},
				{ status: edgeResponse.status }
			);
		}

		return json({
			success: true,
			data: result,
			message: 'Reservation submitted successfully!'
		});
	} catch (err: any) {
		console.error('Error in reservation API handler:', err);
		return json(
			{
				success: false,
				error: err?.message || 'Internal server error while processing reservation'
			},
			{ status: 500 }
		);
	}
};
