import { API } from '$lib/config';
import type {
	Breeds,
	DogsRequestBody,
	DogsResponseBody,
	DogsSearchResponse,
	Location
} from '$lib/types/api';
import { dogSearchRequestObj, filterLocationsWithInRect, getGeoBoundingBox } from '$lib/utils';
import type { RequestEvent } from '@sveltejs/kit';

export async function searchDogs(
	event: RequestEvent
): Promise<DogsSearchResponse | { error: string; message: string }> {
	const { fetch, request, cookies } = event;
	const url = new URL(request.url);
	const locationEnabeled = cookies.get('enabled') == 'true';
	if (locationEnabeled && (cookies.get("state") || url.searchParams.get('state'))) {
		const zips = await getZipsFromLocation(event);

		if ('error' in zips) {
			return { error: zips.error?.toString() ?? '', message: zips.message ?? '' };
		}

		url.searchParams.delete('city');
		url.searchParams.delete('state');
		url.searchParams.delete('zip');
		url.searchParams.delete('distance');

		zips.data?.forEach((zip) => {
			url.searchParams.append('zipCodes', zip);
		});
	}

	const searchRequest = dogSearchRequestObj(url.searchParams.toString());
	searchRequest.headers.set('cookie', request.headers.get('cookie') || '');
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
			total: number;
			next: number;
			prev: number;
	  }
	| { message: string; error: string };
/**
 * requires that city, state, zip, and distance are in the url as params
 * and optionally a list of breeds are in the url
 *
 **/
export async function searchDogsHandler(event: RequestEvent): Promise<SearchDogsHandlerResponse> {
	const searchData = await searchDogs(event);
	if ('error' in searchData) {
		searchData.message += '\nFailed searching for dogs';
		return searchData;
	}

	const dogsResponse = await getDogs(event.request, searchData.resultIds);
	if ('error' in dogsResponse) {
		dogsResponse.message += '\nFailed retrieving dogs';
		return dogsResponse;
	}

	const nextParams = new URL(`${API.base}/${searchData.next}`).searchParams;
	const nextCursor = parseInt(nextParams.get('from') ?? '') || 25;
	const prevParams = new URL(`${API.base}/${searchData.prev}`).searchParams;
	const prevCursor = parseInt(prevParams.get('from') ?? '') || 0;

	return {
		total: searchData.total,
		dogs: dogsResponse,
		next: nextCursor,
		prev: prevCursor
	};
}

export async function getBreeds({ request, fetch }: RequestEvent) {
	const response = await fetch(API.breeds, {
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			cookie: request.headers.get('cookie') || ''
		}
	});
	if (!response.ok) {
		return { error: response.status.toString(), message: response.statusText };
	}
	return (await response.json()) as Breeds;
}

export async function getMatched({ request, fetch }: RequestEvent) {
	const {dogs} = await request.json();
	const ids = dogs.map((dog)=>(dog.id));
	const matchResponse = await fetch(API.findMatch, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			cookie: request.headers.get('cookie') || ''
		},
		body: JSON.stringify(ids)
	});
	if (!matchResponse.ok) {
		return { error: matchResponse.status.toString(), message: matchResponse.statusText };
	}
	
	const {match} = await matchResponse.json();
	const dogsResponse = await getDogs(request, [match]);
	if ('error' in dogsResponse) {
		dogsResponse.message += '\nFailed retrieving dogs';
		return dogsResponse;
	}
	return dogsResponse;
}

/**
 * Will try and get 50 - 100 zipcodes from the search locations api that is as close to users zip code as possible.
 * If we fetch and we get > 100 or < 50 we try filtering by selecting all zip codes in the rect
 * that is the size of the distance. This only will run if we have a zip code.
 **/
export async function getZipsFromLocation({ request, fetch, cookies }: RequestEvent) {
	const reqBody: { states?: string[]; city?: string; size?: number } = {};

	const url = new URL(request.url);

	let state = url.searchParams.get('state');
	if (!state) {
		state = cookies.get('state') || '';
	}
	if (state) {
		reqBody.states = [state];
	}

	let city = url.searchParams.get('city');
	if (!city) {
		city = cookies.get('city') || '';
	}
	if (city) {
		reqBody.city = city;
	}

	reqBody.size = 1000;

	const response = await fetch(API.searchLocations, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			cookie: request.headers.get('cookie') || ''
		},
		body: JSON.stringify(reqBody)
	});
	if (!response.ok) {
		return { error: response.status, message: response.statusText };
	}
	const data = await response.json();

	let results = data.results as Location[];

	let zipCode = url.searchParams.get('zip') || '';
	if (!zipCode) {
		zipCode = cookies.get('zip') || '';
	}
	const distance = url.searchParams.get('distance') || 69; // default to expanding by 1 lat and long
	if (data.total >= 100 && zipCode) {
		const specificLoc = results.filter((loc) => loc.zip_code == zipCode);
		if (!specificLoc.length) {
			return { error: 404, message: 'No results found, try a different zip code' };
		}

		const coords = getGeoBoundingBox(
			specificLoc[0].latitude,
			specificLoc[0].longitude,
			parseInt(distance.toString()) || 69
		);

		// try getting enough by looking at what we have already.
		const filteredRes = filterLocationsWithInRect(results, coords) as Location[];
		// I beleive there may be a bug in the search locations api where
		// GeoBoundingBox is not working. So we will try to filter by zip code return early and not try to expand the search leaving this here in case it gets fixed

		/*// not enough? lets try fetching again
		if (filteredRes.length < 50) {
			console.log(filteredRes)
			const expandedSearchResponse = await fetch(API.searchLocations, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					cookie: request.headers.get('cookie') || ''
				},
				body: JSON.stringify({ geoBoundingBox: coords})
			});
			if (!expandedSearchResponse.ok) {
				console.log(coords, specificLoc[0].latitude, specificLoc[0].longitude)
				console.log("we messsed up in the second fetch call")
				console.log(await expandedSearchResponse.text())
				return { error: expandedSearchResponse.status, message: expandedSearchResponse.statusText };
			}
			const expandedSearchResults = (await expandedSearchResponse.json()) as {
				total: number;
				results: Location[];
			};
			if (expandedSearchResults.total >= 50) {
				return { data: expandedSearchResults.results.map((loc) => loc.zip_code) };
			}
		}
	*/
		return { data: filteredRes.map((loc) => loc.zip_code) };
	}

	return { data: results.map((loc) => loc.zip_code) };
}
