// Types for interacting with the Dog API

export type Dog = {
	id: string;
	img: string;
	name: string;
	age: number;
	zip_code: string;
	breed: string;
};

export type Location = {
	zip_code: string;
	latitude: number;
	longitude: number;
	city: string;
	state: string;
	county: string;
};

export type Coordinates = {
	lat: number;
	lon: number;
};

/**
 * the Returned requestIds from `/dogs/search`
 **/
export type DogsRequestBody = string[];

export type DogsResponseBody = Dog[];

/**
 * the favorited ids from the user
 **/
export type MatchRequestBody = string[];

/**
 * the id of the dog that was matched
 **/
export type MatchResponse = {
	match: string;
};

/**
 * All possible breed names
 **/
export type Breeds = string[];

/**
 * Request Body for searching locations `locations/search`
 **/
export type LocationSearchBody = {
	city?: string;
	states?: string[];
	geoBoundingBox?: {
		top?: Coordinates;
		left?: Coordinates;
		bottom?: Coordinates;
		right?: Coordinates;
		bottom_left?: Coordinates;
		top_left?: Coordinates;
	};
	size?: number;
	from?: number;
};
/**
 * Note: total is the number of results for the query (not just the current page)
 *	 - use this for pagination if needed
 **/
export type LocationSearchResponse = {
	results: Location[];
	total: number; // the total number of results for the query (not just the current page)
};

/**
 * the zip codes to pass to the dogs search request
 **/
export type LocationsResponse = string[];
