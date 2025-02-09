<script lang="ts">
	import { afterNavigate, goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/state';
	import BreedsSelect from '$lib/components/forms/search-form/breeds-select.svelte';
	import type { Breeds } from '$lib/types/api';
	import LocationsModal from '$lib/components/forms/locations-modal.svelte';
	import PuppyGrid from '$lib/components/puppy-grid.svelte';
	import Pagination from '$lib/components/ui/pagination/my-pagination.svelte';
	import { Favorites, initializeSelectedBreeds, SearchParamsStore, SelectedBreeds } from '$lib/store';
	import UseLocationToggle from '$lib/components/forms/use-location-toggle.svelte';
	import SortSelect from '$lib/components/forms/sort-select.svelte';
	import FavoritesModal from '$lib/components/favorites-modal.svelte';
	import MatchedModal from '$lib/components/ui/matched-modal.svelte';
	import {arraysAreEqual} from '$lib/utils';
	let { data } = $props();

	let { breeds } = data;

	// this needs to move and also check for other state that needs to be reset
	afterNavigate(() => {
		const cachedBreeds = $SelectedBreeds;
		$SelectedBreeds = initializeSelectedBreeds();
		if (arraysAreEqual(cachedBreeds, $SelectedBreeds)) {
			return;
		}
		invalidateAll();
	});

	let currentPageNumber = parseInt(page.url.searchParams.get('from') ?? '0') / 24 + 1;
</script>

{#if 'error' in data.searchData}
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-bold text-red-500">Error</h1>
		<p class="text-sm text-muted-foreground">
			{data.searchData.message}
		</p>
	</div>
{:else}
	<div class="flex flex-col-reverse md:flex-row-reverse md:items-start">
		<div class="flex flex-1 flex-col gap-6">
			<header class="border-b px-4 py-4">
				<div class="flex w-full max-w-screen-lg justify-between gap-2">
					<UseLocationToggle />
					<LocationsModal />
				</div>
			</header>

			<main class="flex flex-1 flex-col gap-4 p-4">

					<FavoritesModal />

				{#if data.searchData?.dogs?.length}
					<div class="flex justify-between gap-2">
						<SortSelect />
						<div class="block md:hidden">
							<BreedsSelect breeds={breeds as Breeds} />
						</div>

					</div>

					<PuppyGrid puppies={data?.searchData?.dogs} />
				{/if}
				<Pagination
					perPage={21}
					count={data.searchData?.total ?? 0}
					currentPage={currentPageNumber}
					navigate={(e) => console.log(e)}
				/>
			</main>
		</div>
		<aside class="hidden md:block top-0 max-w-sm md:sticky">
				<BreedsSelect breeds={breeds as Breeds} />
		</aside>
	</div>
	<MatchedModal />
{/if}
