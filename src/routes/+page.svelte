<script lang="ts">
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import SearchForm from '$lib/components/forms/search-form.svelte';
	import type { PageData } from './+page.server';
	import Input from '$lib/components/ui/input/input.svelte';
	import BreedsSelect from '$lib/components/forms/search-form/breeds-select.svelte';
	import type { Breeds, Dog } from '$lib/types/api';
	import StateSelect from '$lib/components/state-select.svelte';
	import Locations from '$lib/components/forms/locations.svelte';
	import LocationsModal from '$lib/components/forms/locations-modal.svelte';
	import { Zips } from '$lib/store';
	import PuppyGrid from '$lib/components/puppy-grid.svelte';
	let { data } = $props();

	let { breeds, searchData } = data;
	let searchResults = $state<typeof searchData>(searchData);

	let selectedBreeds = $state<{ label?: string; value: string }[]>([]);
	let selectedState = $state<string>('');

	async function handleFilter({ formElement }: { formElement: HTMLFormElement }) {
		const formData = new FormData(formElement);
		console.log(formData.get('state'));

		selectedBreeds.forEach((breed) => {
			formData.append('breeds', breed.value);
		});

		$Zips &&
			$Zips.length &&
			$Zips.forEach((zip) => {
				formData.append('zipCodes', zip);
			});

		const data = new URLSearchParams(
			[...formData].map(([key, value]) => [key, value.toString().trim()])
		);
		searchResults = await fetch(`/api/search-dogs?${data.toString()}`).then((r) => r.json());
		goto(`/?${data.toString()}`);
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
		<BreedsSelect bind:tags={selectedBreeds} breeds={breeds as Breeds} />
	</aside>
</div>
