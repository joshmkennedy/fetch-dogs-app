export async function POST({ request }) {
	const { dogs } = await request.json();
	return new Response(JSON.stringify({ matched: dogs[0] }), {status: 200});
}
