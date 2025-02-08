<script lang="ts">
	import Combobox from '$lib/components/ui/combobox/mycombobox.svelte';
	import { STATES } from '$lib/config';
	import { onMount } from 'svelte';
	let { selectedStateCode = $bindable() }: { selectedStateCode: string } = $props();

	// setting the zips we will use to fetch doggies
	const options = STATES.map((obj) => {
		const [label, value] = Object.entries(obj)[0];
		return { label: label.trim(), value: value.trim() };
	});

	let selectedState = $derived(
		STATES.reduce((label, obj) => {
			const [key, value] = Object.entries(obj)[0];
			return value.toLowerCase().trim() == selectedStateCode.toLowerCase().trim()
				? key.trim()
				: label;
		}, '')
	);
	$effect(()=>{
		console.log(selectedState, selectedStateCode)
	})
	let ready = $state(false)
	onMount(()=>{
		ready = true
	})

</script>
{#if ready}
<Combobox
	label="Your State or Province"
	inputValue={selectedState}
	bind:value={selectedStateCode}
	{options}
	name="state"
></Combobox>
{/if}
