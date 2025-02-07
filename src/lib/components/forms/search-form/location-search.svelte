<script lang="ts">
	import Combobox from '$lib/components/ui/combobox/mycombobox.svelte';
	import debounce from 'lodash/debounce';
	import { onMount } from 'svelte';
	import { STATES } from '$lib/config';
	import type { Location } from '$lib/types/api';
	import { HeartFilled } from 'svelte-radix';

	let origin = '';
	onMount(() => {
		origin = window.location.origin;
	});

	const options = STATES.map((obj) => {
		const [label, value] = Object.entries(obj)[0];
		return { label: label.trim(), value: value.trim() };
	});

	let { zips = $bindable() }: { zips: string[] } = $props();

	let city = $state('');
	let selectedState = $state<string | null>();

	// used as the drop down for the city combobox
	// we will group all Locations by `${city}, ${state}, and ${county}`
	let locationSuggestions = $state<Record<string, Location[] | undefined>>({});

	let isLoading = $state(false);

	async function search(args: { city: string; states: string }) {
		if (!args.city) return;
		isLoading = true;
		const res = await fetch(`${origin}/api/search-locations/`, {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(args)
		})
			.then((res) => res.json())
			.finally(() => (isLoading = false));
		// grouping the returned locations by city, state, and county
		locationSuggestions = Object.groupBy(
			res.data,
			({ city, state, county }) => `${county} ${city}, ${state}`
		);
	}

	$effect(() => {
		// clear city and suggestions when state is changed
		if (selectedState) {
			setTimeout(() => {
				// things in promises or callback are not tracked by svelte's effect
				// rune
				city = '';
				locationSuggestions = {};
			});
		}
	});
	
	// setting the zips we will use to fetch doggies
	function setZips(selectedLoc: { label?: string; value: string } | undefined) {
		if (selectedLoc?.label) {
			zips = locationSuggestions[selectedLoc.label]?.map((loc) => loc.zip_code) || [];
		}
	}

	// Creating a debounced search function that will only run if city changes,
	const debouncedSearch = debounce(
		(city: string) => search({ city, states: selectedState ?? '' }),
		500,
		{
			leading: true
		}
	);
	$effect(() => {
		if (!city) return;
		//since city is the only $state rune it will only run when city changes
		debouncedSearch(city);
	});
</script>

<div class="flex gap-6">
	<Combobox
		removeOnSelect={false}
		label="Your State or Province"
		{options}
		onChange={(selected) => {
			if (!selected) return;
			selectedState = selected?.value || '';
		}}
		name="state"
	>
	</Combobox>
	<div>
		{#if selectedState}
			<Combobox
				bind:inputValue={city}
				label="Your City"
				removeOnSelect={false}
				name="city"
				onChange={setZips}
				options={Object.keys(locationSuggestions).map((loc) => ({
					label: loc,
					value: loc
				}))}
			/>
		{/if}
	</div>
</div>
