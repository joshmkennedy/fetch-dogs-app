import cookies from 'browser-cookies';
import { browser } from '$app/environment';
import { derived, writable } from 'svelte/store';
import type { DogSearchSortParam, SortDirection, SortCategory } from './types/api';
import { page } from '$app/state';

let initialZips: string[] = [];
export function initializeZips() {
	const jsonZips = localStorage.getItem('zips');
	if (jsonZips) {
		try {
			initialZips = JSON.parse(jsonZips);
		} catch (e) {
			initialZips = [];
		}
	}
	return initialZips;
}

export type LocationInfoType = {
	enabled: boolean;
	city: string | null;
	state: string | null;
	zip: string | null;
	distance: number | null;
};

let initialLocationInfo = { city: null, state: null, zip: null, distance: null, enabled: false };
export function initializeLocationInfo() {
	const jsonLocationInfo: LocationInfoType = initialLocationInfo;
	jsonLocationInfo.enabled = typeof window !== 'undefined' && cookies.get('enabled') == 'true';
	jsonLocationInfo.city = (typeof window !== 'undefined' && cookies.get('city')) || '';
	jsonLocationInfo.state = (typeof window !== 'undefined' && cookies.get('state')) || '';
	jsonLocationInfo.zip = (typeof window !== 'undefined' && cookies.get('zip')) || '';
	jsonLocationInfo.distance =
		(typeof window !== 'undefined' && parseInt(cookies.get('distance') ?? '')) || 69;
	return jsonLocationInfo;
}

//╭─────────────────────────╮
//│    [   Favorites   ]    │
//╰─────────────────────────╯

export type FavoritesType = string[];
let initialFavorites: FavoritesType = [];
export function initializeFavorites() {
	const jsonFavorites = localStorage.getItem('favorites');
	if (jsonFavorites) {
		try {
			initialFavorites = JSON.parse(jsonFavorites);
		} catch (e) {
			initialFavorites = [];
		}
	}
	return initialFavorites;
}

export function initializeSelectedBreeds(): string[] {
	const urlBreeds = new URLSearchParams(window.location.search).getAll('breeds');
	if(urlBreeds.length){
		return urlBreeds;
	}
	return [];
}

export const LocationInfo = writable<LocationInfoType | undefined>(
	(browser && initializeLocationInfo()) || undefined
);
LocationInfo.subscribe((locationInfo) => {
	if (browser) {
		if (locationInfo?.enabled == false || locationInfo?.enabled == true) {
			cookies.set('enabled', locationInfo?.enabled.toString());
		}
		if (locationInfo?.city) {
			cookies.set('city', locationInfo?.city);
		}
		if (locationInfo?.state) {
			cookies.set('state', locationInfo?.state || '');
		}
		if (locationInfo?.zip) {
			cookies.set('zip', locationInfo?.zip || '');
		}
		if (locationInfo?.distance) {
			cookies.set('distance', locationInfo?.distance?.toString() || '');
		}
	}
});

export const Favorites = writable<FavoritesType | false>(browser && initializeFavorites());
Favorites.subscribe((favorites) => {
	browser && localStorage.setItem('favorites', JSON.stringify(favorites));
});

export const SelectedBreeds = writable<string[]>((browser && initializeSelectedBreeds()) || []);

const initialSort =initializeSort();
export const SortCategoryOption = writable<SortCategory>(initialSort.cat);
export const SortDirectionOption = writable<SortDirection>(initialSort.dir)
export function initializeSort() {
	if(!browser) return {cat: 'breed', dir: 'asc'};
	const param = page.url.searchParams.get('sort');
	if(param){
		const [cat, dir] = param.split(':');
		return {cat, dir};
	}
	return {cat: 'breed', dir: 'asc'};
}
export const SortParam = derived([SortCategoryOption, SortDirectionOption], ([$SortCategoryOption, $SortDirectionOption]) => {
	return `${$SortCategoryOption}:${$SortDirectionOption}` as DogSearchSortParam;
});
SortParam.subscribe((sortParam)=>{
	console.log(sortParam)
})

// This derived state is what we will use to pass to the search function.
// We will add subscriber that will run the search function when this state
// changes
export const SearchParamsStore = derived([LocationInfo, SelectedBreeds, SortParam], ([$LocationInfo, $SelectedBreeds, $SortParam]) => {
	return {
		enabled: $LocationInfo?.enabled,
		city: $LocationInfo?.city,
		state: $LocationInfo?.state,
		zip: $LocationInfo?.zip,
		distance: $LocationInfo?.distance,
		breeds: $SelectedBreeds,
		sortBy: $SortParam, 
	};
});
