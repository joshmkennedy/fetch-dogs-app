import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const authToken = event.cookies.get('fetch-access-token');

    if (!authToken && event.url.pathname !== '/login') {
        return new Response(null, {
            status: 302,
            headers: { Location: '/login' }
        });
    }

    return resolve(event);
};
