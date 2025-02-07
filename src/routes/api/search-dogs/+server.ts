import { searchDogsHandler } from '$lib/server/api';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async (event) => {
	const data = await searchDogsHandler(event);
	return new Response(JSON.stringify(data), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
};
