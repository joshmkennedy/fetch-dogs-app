import { PUBLIC_API } from '$env/static/public';

export const API = {
	base: PUBLIC_API,

	login: `${PUBLIC_API}/auth/login`,

	dogs: `${PUBLIC_API}/dogs`, // post
	searchDogs: `${PUBLIC_API}/dogs/search`, // get
	breeds: `${PUBLIC_API}/dogs/breeds`, // get
	findMatch: `${PUBLIC_API}/dogs/breeds`, // post

	locations: `${PUBLIC_API}/locations`, // post
	searchLocations: `${PUBLIC_API}/locations/search` // post
};

export const STATES = [
	{ Alabama: 'AL' },
	{ Kentucky: 'KY' },
	{ Ohio: 'OH' },
	{ Alaska: 'AK' },
	{ Louisiana: 'LA' },
	{ Oklahoma: 'OK' },
	{ Arizona: 'AZ' },
	{ Maine: 'ME' },
	{ Oregon: 'OR' },
	{ Arkansas: 'AR' },
	{ Maryland: 'MD' },
	{ Pennsylvania: 'PA' },
	{ 'American Samoa': 'AS' },
	{ Massachusetts: 'MA' },
	{ 'Puerto Rico': 'PR' },
	{ California: 'CA' },
	{ Michigan: 'MI' },
	{ 'Rhode Island': 'RI' },
	{ Colorado: 'CO' },
	{ Minnesota: 'MN' },
	{ 'South Carolina': 'SC' },
	{ Connecticut: 'CT' },
	{ Mississippi: 'MS' },
	{ 'South Dakota': 'SD' },
	{ Delaware: 'DE' },
	{ Missouri: 'MO' },
	{ Tennessee: 'TN' },
	{ 'District of Columbia': 'DC' },
	{ Montana: 'MT' },
	{ Texas: 'TX' },
	{ Florida: 'FL' },
	{ Nebraska: 'NE' },
	{ 'Trust Territories': 'TT' },
	{ Georgia: 'GA' },
	{ Nevada: 'NV' },
	{ Utah: 'UT' },
	{ Guam: 'GU' },
	{ 'New Hampshire': 'NH' },
	{ Vermont: 'VT' },
	{ Hawaii: 'HI' },
	{ 'New Jersey': 'NJ' },
	{ Virginia: 'VA' },
	{ Idaho: 'ID' },
	{ 'New Mexico': 'NM' },
	{ 'Virgin Islands': 'VI' },
	{ Illinois: 'IL' },
	{ 'New York': 'NY' },
	{ Washington: 'WA' },
	{ Indiana: 'IN' },
	{ 'North Carolina': 'NC' },
	{ 'West Virginia': 'WV' },
	{ Iowa: 'IA' },
	{ 'North Dakota': 'ND' },
	{ Wisconsin: 'WI' },
	{ Kansas: 'KS' },
	{ 'Northern Mariana Islands': 'MP' },
	{ Wyoming: 'WY' }
] as Record<string, string>[]; 
