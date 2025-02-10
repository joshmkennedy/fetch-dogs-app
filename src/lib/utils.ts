import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';
import { API } from './config';
import type { Coordinates, DogSearchParams, GeoBoundingBox, Location } from './types/api';
import { browser } from '$app/environment';
import { SearchParamsStore } from './store';
import { get } from 'svelte/store';
import { goto } from '$app/navigation';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};

export function parseDogSearchParams(paramObj: DogSearchParams) {
	const params = new URLSearchParams();
	if ('breeds' in paramObj && paramObj.breeds) {
		paramObj.breeds.forEach((breed) => {
			params.append('breeds', breed);
		});
	}
	if ('zipCodes' in paramObj && paramObj.zipCodes) {
		paramObj.zipCodes.forEach((zip) => {
			params.append('zipCodes', zip);
		});
	}
	if ('from' in paramObj && paramObj.from) {
		params.set('from', paramObj.from.toString());
	}
	if ('sort' in paramObj && paramObj.sort) {
		params.set('sort', paramObj.sort);
	}
	params.set('size', '21');
	return params.toString();
}

/**
 * Accepts the string of the pre built search params or an object that will be parsed to search params
 **/
export function dogSearchRequestObj(searchParams: string | DogSearchParams | undefined) {
	if (typeof searchParams == 'object') {
		searchParams = parseDogSearchParams(searchParams);
	}
	return new Request(`${API.searchDogs}?${searchParams ?? ''}`, {
		method: 'GET',
		credentials: 'include'
	});
}

export type LocationSearchParams = {
	city?: string;
	state?: string;

	size?: number;
	from?: number;
};

export async function updateURLAndRevalidate(page) {
	const searchDeps = get(SearchParamsStore) as any;
	if (!browser) return;

	const params = page.url.searchParams;

	params.delete('from'); // if this is called we wnat to start at the beg
	params.delete('breeds');
	searchDeps.breeds.forEach((breed) => {
		params.append('breeds', breed);
	});
	if (!searchDeps?.enabled) {
		params.delete('zip');
		params.delete('distance');
		params.delete('city');
		params.delete('state');
		params.delete('sort');
	} else {
		if (searchDeps?.zip) {
			params.set('zip', searchDeps.zip);
		}

		if (searchDeps?.distance) {
			params.set('distance', searchDeps?.distance?.toString());
		}
		if (searchDeps?.city) {
			params.set('city', searchDeps?.city);
		}
		if (searchDeps?.state) {
			params.set('state', searchDeps?.state);
		}
	}
	if (searchDeps?.sortBy) {
		params.set('sort', searchDeps?.sortBy);
	}
	await goto(page.url.toString(), { invalidateAll: true });
}

export function arraysAreEqual(a, b) {
	if (a.length !== b.length) return false;

	for (let i = 0; i < a.length; i++) {
		if (a[i] !== b[i]) {
			return false;
		}
	}

	return true;
}
export function roundTo6(num: number): number {
	return Math.round(num * 1_000_000) / 1_000_000;
}

export function getGeoBoundingBox(
	lat: number,
	lon: number,
	distanceMiles: number
): { top: Coordinates; bottom: Coordinates; left: Coordinates; right: Coordinates } {
	const earthRadiusMiles = 3958.8; // Radius of the Earth in miles

	// Convert distance from miles to radians
	const latOffset = (distanceMiles / earthRadiusMiles) * (180 / Math.PI);
	const longOffset =
		((distanceMiles / earthRadiusMiles) * (180 / Math.PI)) / Math.cos((lat * Math.PI) / 180);

	return {
		top: { lat: roundTo6(lat + latOffset), lon },
		bottom: { lat: roundTo6(lat - latOffset), lon },
		left: { lat, lon: roundTo6(lon - longOffset) },
		right: { lat, lon: roundTo6(lon + longOffset) }
	};
}

/**
 * Checks if a coordinate is within the given GeoBoundingBox.
 * @param coord - The coordinate to check (latitude & longitude)
 * @param box - The GeoBoundingBox object
 * @returns true if the coordinate is inside the box, false otherwise
 */
export function isCoordInBoundingBox(
	coord: { lat: number; lon: number },
	box: GeoBoundingBox
): boolean {
	console.log({ coord, box });
	return (
		coord.lat <= box.top.lat &&
		coord.lat >= box.bottom.lat &&
		coord.lon >= box.left.lon &&
		coord.lon <= box.right.lon
	);
}

export function filterLocationsWithInRect(locations: Location[], geoBoundingBox: GeoBoundingBox) {
	return locations.filter((loc) =>
		isCoordInBoundingBox({ lat: loc.latitude, lon: loc.longitude }, geoBoundingBox)
	);
}
