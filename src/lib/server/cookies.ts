import type { Cookies } from '@sveltejs/kit';

export async function forwardCookies(cookieJar: Cookies, setCookies: string[]) {
	setCookies.forEach((cookiestr) => {
		const cookieParts = cookiestr.split(';');
		const [name, value] = cookieParts[0].split('=').map((s) => s.trim());
		const expiresPart =
			cookieParts.find((part) => part.startsWith('Expires'))?.split('=')[1] ??
			new Date(new Date().setHours(new Date().getHours() + 1));

		cookieJar.set(name, value, { path: '/', expires: new Date(expiresPart) });
	});
}
