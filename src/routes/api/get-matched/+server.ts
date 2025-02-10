import { getMatched } from '$lib/server/api';

export async function POST(event) {
	const matchedDog = await getMatched(event);
	if ('error' in matchedDog) {
		return new Response(JSON.stringify({ error: matchedDog.message }), { status: matchedDog.error });
	}
	return new Response(JSON.stringify({ matched: matchedDog }), { status: 200 });
}
