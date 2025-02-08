<script lang="ts">
	import { goto } from '$app/navigation';
	import BreedsSelect from '$lib/components/forms/search-form/breeds-select.svelte';
	import type { Breeds, Dog } from '$lib/types/api';
	import LocationsModal from '$lib/components/forms/locations-modal.svelte';
	import PuppyGrid from '$lib/components/puppy-grid.svelte';
	import { SearchParamsStore } from '$lib/store';
	import UseLocationToggle from '$lib/components/forms/use-location-toggle.svelte';
	import { browser } from '$app/environment';
	let { data } = $props();

	let { breeds, searchData } = data;
	let searchResults = $state<typeof searchData>(searchData);

	SearchParamsStore.subscribe(async (params) => {
		searchResults = await handleFilter(params);
	});

	async function handleFilter(searchDeps: typeof $SearchParamsStore) {
		if (!browser) return;
		console.log(searchDeps);

		const params = new URLSearchParams();

		searchDeps.breeds.forEach((breed) => {
			params.append('breeds', breed);
		});
		if(searchDeps?.zip){
		params.set('zip', searchDeps.zip);
		}
		if(searchDeps?.distance){
			params.set('distance', searchDeps?.distance?.toString());
		}
		if(searchDeps?.city){
			params.set('city', searchDeps?.city);
		}
		if(searchDeps?.state){
			params.set('state', searchDeps?.state);
		}
		goto(`/?${params.toString()}`);
		return await fetch(`/api/search-dogs?${params.toString()}`).then((r) => r.json());
	}

	const puppies: Dog[] = $derived(
		(searchResults && !('error' in searchResults) && searchResults.dogs) || []
	);
</script>

<div class="flex flex-col-reverse md:flex-row-reverse">
	<div class="flex flex-1 flex-col gap-6">
		<header class="border-b px-4 py-4">
			<div class="flex w-full max-w-screen-lg justify-between gap-2">
				<div></div>
				<UseLocationToggle />
				<LocationsModal />
			</div>
		</header>

		<main class="flex-1 p-4">
			{#if puppies.length}
				<PuppyGrid {puppies} />
			{/if}
		</main>
	</div>
	<aside class="max-w-sm p-4">
		<BreedsSelect breeds={breeds as Breeds} />
	</aside>
</div>
