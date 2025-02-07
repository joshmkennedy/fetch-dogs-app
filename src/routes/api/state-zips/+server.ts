import { getZipsFromLocation } from "$lib/server/api";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async (event) => {
	const res = await getZipsFromLocation(event);
	if (res.error) {
		return new Response(JSON.stringify({ error: res.message }), {
			status: res.error,
			statusText: res.message
		});
	}
	return new Response(JSON.stringify(res.data), {
		status: 200,
		statusText: 'ok'
	});
};
