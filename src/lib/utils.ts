import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';
import { API } from './config';
import type { DogSearchParams } from './types/api';

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

// TODO: find out what kind of query params are expected ie comma seperated or duplicate keys
export function parseArrayToSearchParams(param: string[]): string {
	return param.join(',');
}

export function parseDogSearchParams(paramObj: DogSearchParams) {
	const params = new URLSearchParams();
	if ('breeds' in paramObj && paramObj.breeds) {
		params.set('breeds', parseArrayToSearchParams(paramObj.breeds));
	}
	if ('zipCodes' in paramObj && paramObj.zipCodes) {
		params.set('zipCodes', parseArrayToSearchParams(paramObj.zipCodes));
	}
	if ('size' in paramObj && paramObj.size) {
		params.set('size', paramObj.size.toString());
	}
	if ('from' in paramObj && paramObj.from) {
		params.set('from', paramObj.from.toString());
	}
	if ('sort' in paramObj && paramObj.sort) {
		params.set('sort', paramObj.sort);
	}
	return params.toString();
}

/**
 * Accepts the string of the pre built search params or an object that will be parsed to search params
 **/
export function dogSearchRequestObj(searchParams: string | DogSearchParams | undefined) {
	if (typeof searchParams == 'object') {
		searchParams = parseDogSearchParams(searchParams);
	}
	return new Request(`${API.searchDogs}?${searchParams ?? ""}`, {
		method: 'GET',
		credentials: 'include'
	});
}


export type LocationSearchParams = {
	city?:string;
	state?:string;

	size?:number;
	from?:number;
}

export function parseLocationSearchParams(paramObj: LocationSearchParams){
	const params = new URLSearchParams()	
}
