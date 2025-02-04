<script lang='ts'>
	import Button from "../ui/button/button.svelte";
	import BreedsSelect from "./search-form/breeds-select.svelte";
	const data = $props()
	let tags = $state<{label?:string; value:string;}[]>([]);
</script>

<form>
	<BreedsSelect bind:tags breeds={data.breeds}/>
	<Button type="submit">Find My New Buddy</Button>
</form>
