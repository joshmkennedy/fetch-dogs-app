import { getBreeds, searchDogsHandler, type SearchDogsHandlerResponse } from '$lib/server/api';
import type { Breeds } from '$lib/types/api';
import type { PageServerLoad } from './$types';

export type PageData = {
	searchData: SearchDogsHandlerResponse;
	breeds: Breeds | { error: string; message: string };
};

export const load: PageServerLoad = async (event): Promise<PageData> => {
	try {
		const [searchDogsData, breeds] = await Promise.allSettled([
			searchDogsHandler(event),
			getBreeds(event)
		]);

		const pagedata = {
			searchData:
				searchDogsData.status === 'fulfilled'
					? searchDogsData.value
					: { error: '500', message: searchDogsData.reason },
			breeds:
				breeds.status === 'fulfilled' ? breeds.value : { error: '500', message: breeds.reason }
		};

		return structuredClone(pagedata); // ensure we dont get the serialization bug
	} catch (e) {
		return e.toString();
	}
};
