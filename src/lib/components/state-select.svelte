<script lang="ts">
	import Combobox from '$lib/components/ui/combobox/mycombobox.svelte';
	import { STATES } from '$lib/config';
	let {
		selectedState = $bindable()
	}: {selectedState: string } = $props();

	// setting the zips we will use to fetch doggies
	const options = STATES.map((obj) => {
		const [label, value] = Object.entries(obj)[0];
		return { label: label.trim(), value: value.trim() };
	});
</script>

<Combobox
	bind:inputValue={selectedState}
	onChange={(selected) => {}}
	removeOnSelect={false}
	label="Your State or Province"
	{options}
	name="state"
></Combobox>
