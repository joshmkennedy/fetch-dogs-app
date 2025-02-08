<script lang='ts'>
	import type {Dog} from '$lib/types/api';
	import PuppyCard from './puppy-card.svelte';
	const {puppies}:{puppies:Dog[]} = $props();
	console.log(puppies[0].id)
</script>

<div class="grid grid-cols-3 gap-4">
	{#each puppies as puppy}
		<PuppyCard {puppy}/>
	{/each}
</div>
