import { API } from '$lib/config';
import type { Breeds, DogsRequestBody, DogsResponseBody, DogsSearchResponse } from '$lib/types/api';
import { dogSearchRequestObj } from '$lib/utils';

export async function searchDogs(
	req: Request
): Promise<DogsSearchResponse | { error: string; message: string }> {
	const url = new URL(req.url);
	const searchRequest = dogSearchRequestObj(url.searchParams.toString());
	searchRequest.headers.set('cookie', req.headers.get('cookie') || '');

	const searchResponse = await fetch(searchRequest);
	if (!searchResponse.ok) {
		return {
			message: searchResponse.statusText,
			error: searchResponse.status.toString()
		};
	}
	return await searchResponse.json();
}

export async function getDogs(
	request: Request,
	ids: DogsRequestBody
): Promise<DogsResponseBody | { error: string; message: string }> {
	const response = await fetch(`${API.dogs}`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			cookie: request.headers.get('cookie') || ''
		},
		body: JSON.stringify(ids)
	});

	if (response.ok) {
		return await response.json();
	}
	return {
		error: response.status.toString(),
		message: response.statusText
	};
}

export type SearchDogsHandlerResponse =
	| {
		dogs: DogsResponseBody;
		next: number;
		prev: number;
	}
	| { message: string; error: string };
export async function searchDogsHandler({
	request
}: {
	request: Request;
}): Promise<SearchDogsHandlerResponse> {
	const searchData = await searchDogs(request);
	if ('error' in searchData) {
		searchData.message += '\nFailed searching for dogs';
		return searchData;
	}

	const dogsResponse = await getDogs(request, searchData.resultIds);
	if ('error' in dogsResponse) {
		dogsResponse.message += '\nFailed retrieving dogs';
		return dogsResponse;
	}

	const nextParams = new URL(`${API.base}/${searchData.next}`).searchParams;
	const nextCursor = parseInt(nextParams.get('from') ?? '') || 25; // TODO: hmmm this could be handled better
	const prevParams = new URL(`${API.base}/${searchData.prev}`).searchParams;
	const prevCursor = parseInt(prevParams.get('from') ?? '') || 0;

	return {
		dogs: dogsResponse,
		next: nextCursor,
		prev: prevCursor
	};
}

export async function getBreeds({ request, fetch }) {
	const response = await fetch(API.breeds, {
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			cookie: request.headers.get('cookie') || ''
		}
	});
	if (!response.ok) {
		return { error: response.status, message: response.statusText };
	}
	return (await response.json()) as Breeds;
}
