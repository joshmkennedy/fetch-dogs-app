import { getMatched } from "$lib/server/api";

export async function POST(event) {
	const response = await getMatched(event);
	if ('error' in response) {
		return new Response(JSON.stringify({ error: response.message }), { status: response.error });
	}
	return new Response(JSON.stringify({ matched: response[0] }), {status: 200});
}
