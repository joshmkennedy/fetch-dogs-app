import { browser } from '$app/environment';
import { writable } from 'svelte/store';


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
	city: string | null;
	state: string | null;
	zip: string | null;
	distance: number | null;
};

let initialLocationInfo = { city: null, state: null, zip: null , distance: null};
export function initializeLocationInfo() {
	const jsonLocationInfo = typeof window !== 'undefined' && localStorage.getItem('locationInfo');
	if (jsonLocationInfo) {
		try {
			initialLocationInfo = JSON.parse(jsonLocationInfo);
		} catch (e) {
			initialLocationInfo = { city: null, state: null, zip: null, distance: null };
		}
	}
	return initialLocationInfo;
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

export const Zips = writable<string[] | false>(browser && initializeZips());
Zips.subscribe((zips) => {
	browser && localStorage.setItem('zips', JSON.stringify(zips));
});

export const LocationInfo = writable<LocationInfoType | false>(browser && initializeLocationInfo());
LocationInfo.subscribe((locationInfo) => {
	browser && localStorage.setItem('locationInfo', JSON.stringify(locationInfo));
});

export const Favorites = writable<FavoritesType | false>(browser && initializeFavorites());
Favorites.subscribe((favorites) => {
	browser && localStorage.setItem('favorites', JSON.stringify(favorites));
});


