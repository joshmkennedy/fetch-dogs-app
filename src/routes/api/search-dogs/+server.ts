import { searchDogsHandler } from '$lib/server/api';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request }) => {
	const data = await searchDogsHandler({ request });
	return new Response(JSON.stringify(data), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
};
