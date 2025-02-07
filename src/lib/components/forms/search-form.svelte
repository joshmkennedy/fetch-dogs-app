<script lang='ts'>
	import Button from "../ui/button/button.svelte";
	import BreedsSelect from "./search-form/breeds-select.svelte";
	import LocationSearch from "./search-form/location-search.svelte";
	const data = $props()
	let zips = $state<string[]>([]);
	let tags = $state<{label?:string; value:string;}[]>([]);

</script>

<form action="/" method="POST">

	<LocationSearch bind:zips />
	
	<BreedsSelect bind:tags breeds={data.breeds}/>
	<Button type="submit">Find My New Buddy</Button>
</form>
