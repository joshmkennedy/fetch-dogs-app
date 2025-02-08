<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import BreedsSelect from '$lib/components/forms/search-form/breeds-select.svelte';
	import type { Breeds, Dog } from '$lib/types/api';
	import LocationsModal from '$lib/components/forms/locations-modal.svelte';
	import PuppyGrid from '$lib/components/puppy-grid.svelte';
	import Pagination from '$lib/components/ui/pagination/my-pagination.svelte';
	import { SearchParamsStore } from '$lib/store';
	import UseLocationToggle from '$lib/components/forms/use-location-toggle.svelte';
	import { browser } from '$app/environment';
	import SortSelect from '$lib/components/forms/sort-select.svelte';
	import { onMount } from 'svelte';
	let { data } = $props();

	let { breeds, searchData } = data;
	let searchResults = data.searchData;

	// SearchParamsStore.subscribe(async (params) => {
	// 	searchResults = await handleFilter(params);
	// });

	const puppies: Dog[] =  ((searchResults && !('error' in searchResults) && searchResults.dogs) || []);
</script>

{#if data.searchData.error}
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-bold text-red-500">Error</h1>
		<p class="text-sm text-muted-foreground">
			{data.searchData.message}
		</p>
	</div>
	{/if}

<div class="flex flex-col-reverse md:flex-row-reverse">
	<div class="flex flex-1 flex-col gap-6">
		<header class="border-b px-4 py-4">
			<div class="flex w-full max-w-screen-lg justify-between gap-2">
				<div>
					<SortSelect />
				</div>
				<UseLocationToggle />
				<LocationsModal />
			</div>
		</header>

		<main class="flex-1 p-4">
			{#if data.searchData?.dogs?.length}
				<PuppyGrid puppies={data?.searchData?.dogs} />
			{/if}
			<Pagination navigate={(e) => console.log(e)} />
		</main>
	</div>
	<aside class="max-w-sm p-4">
		<BreedsSelect breeds={breeds as Breeds} />
	</aside>
</div>
