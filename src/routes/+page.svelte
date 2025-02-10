<script lang="ts">
	import { afterNavigate, goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/state';
	import BreedsSelect from '$lib/components/forms/breeds-select.svelte';
	import type { Breeds } from '$lib/types/api';
	import LocationsModal from '$lib/components/locations-modal.svelte';
	import PuppyGrid from '$lib/components/puppy-grid.svelte';
	import Pagination from '$lib/components/ui/pagination/my-pagination.svelte';
	import { initializeSelectedBreeds, SelectedBreeds } from '$lib/store';
	import UseLocationToggle from '$lib/components/forms/use-location-toggle.svelte';
	import SortSelect from '$lib/components/forms/sort-select.svelte';
	import FavoritesModal from '$lib/components/favorites-modal.svelte';
	import MatchedModal from '$lib/components/matched-modal.svelte';
	import { arraysAreEqual } from '$lib/utils';
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
		<div class="flex flex-1 flex-col gap-2">
			<header class="border-b px-4 py-4">
				<div
					class="flex w-full max-w-screen-lg flex-col justify-between gap-2 md:flex-row md:items-center"
				>
					<div>
						<h1 class="text-3xl font-bold text-primary sm:text-2xl">Puppy Fetch</h1>
						<p class="text-sm">Fetching buddies one paw at a time</p>
					</div>

					<div class="flex flex-col gap-2">
						<LocationsModal />
						<UseLocationToggle />
					</div>
				</div>
			</header>

			<main class="flex flex-1 flex-col gap-4 p-4">
				<FavoritesModal />

				<div class="flex justify-between gap-2">
					<SortSelect />
					<div class="block md:hidden">
						<BreedsSelect breeds={breeds as Breeds} />
					</div>
				</div>

				{#if data.searchData?.dogs?.length}
					<PuppyGrid puppies={data?.searchData?.dogs} />
					<Pagination
						perPage={21}
						count={data.searchData?.total ?? 0}
						currentPage={currentPageNumber}
						navigate={(e) => console.log(e)}
					/>
				{:else}
					<p class="text-center text-sm text-muted-foreground">
						No dogs found. Try a different breed or location.
					</p>
				{/if}
			</main>
		</div>
		<aside class="top-0 hidden max-w-sm md:sticky md:block">
			<BreedsSelect breeds={breeds as Breeds} />
		</aside>
	</div>
	<MatchedModal />
{/if}
