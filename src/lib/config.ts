import { PUBLIC_API } from "$env/static/public";

export const API = {
	base: PUBLIC_API,

	login: `${PUBLIC_API}/auth/login`,

	dogs:`${PUBLIC_API}/dogs`, // post 
	searchDogs: `${PUBLIC_API}/dogs/search`, // get 
	breeds:`${PUBLIC_API}/dogs/breeds`, // get 
	findMatch:`${PUBLIC_API}/dogs/breeds`, // post 

	locations: `${PUBLIC_API}/locations`, // post
	searchLocations: `${PUBLIC_API}/locations/search`, // post
}
