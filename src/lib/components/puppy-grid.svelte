<script lang="ts">
	import type { Dog } from '$lib/types/api';
	import PuppyCard from './puppy-card.svelte';

	const { puppies }: { puppies: Dog[] } = $props();
</script>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
	{#each puppies as puppy}
		<PuppyCard {puppy} />
	{/each}
</div>
