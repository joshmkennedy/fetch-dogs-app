import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { forwardCookies } from '$lib/server/cookies';
import { API } from '$lib/config';

export const actions = {
	default: async ({ request, cookies, fetch }) => {
		const response = await fetch(API.login, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: await request.text()
		});

		forwardCookies(cookies, response.headers.getSetCookie())

		redirect(303, '/')
	}
} satisfies Actions;
