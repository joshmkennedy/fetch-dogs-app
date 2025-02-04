import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async ({ request, fetch }) => {
	const searchResponse = await fetch('https://frontend-take-home-service.fetch.com/dogs/search', {
		method: 'GET',
		credentials: 'include',
		headers: {
			cookie: request.headers.get('cookie')
		}
	});

	if (!searchResponse.ok) {
		return {
			error: searchResponse.statusText,
			message: await searchResponse.text(),
		};
	}

	const searchData = await searchResponse.json();
	const dogsResponse = await fetch('https://frontend-take-home-service.fetch.com/dogs',{
		method:'POST',
		credentials:'include',
		headers:{
			cookie:request.headers.get('cookie'),
			"Content-Type":"application/json",
		},
		body:JSON.stringify(searchData.resultIds)
	})

	const dogs = await dogsResponse.json();

	return {
		dogs,
		next:searchData.next,
		prev:searchData.prev
	};
}) satisfies PageServerLoad;
