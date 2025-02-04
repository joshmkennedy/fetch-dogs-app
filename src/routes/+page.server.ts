import { getBreeds, searchDogsHandler, type SearchDogsHandlerResponse } from '$lib/server/api';
import type { Breeds } from '$lib/types/api';
import type { PageServerLoad } from './$types';

export type PageData = {
	searchData:	SearchDogsHandlerResponse;
	breeds: Breeds | {error:number; message:string};
}

export const load: PageServerLoad = async (event):Promise<PageData> => {
	const [searchDogsData, breeds] = await Promise.allSettled([
		searchDogsHandler(event),
		getBreeds(event)
	]);

	return {
		searchData:
			searchDogsData.status === 'fulfilled'
				? searchDogsData.value
				: { error: '500', message: searchDogsData.reason },
		breeds:
			breeds.status === 'fulfilled'
				? breeds.value
				: { error: '500', message: breeds.reason }
	};
};
