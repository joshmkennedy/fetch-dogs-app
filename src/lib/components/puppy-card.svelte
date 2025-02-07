<script lang="ts">
	import type { Dog } from '$lib/types/api';
	import HeartFilled from 'svelte-radix/HeartFilled.svelte';
	import Location from '$lib/components/ui/icons/location.svelte';
	import { CountdownTimer } from 'svelte-radix';

	const { puppy }: { puppy: Dog } = $props();
</script>

{#snippet attribute(Icon, label, value)}
	<div class="flex items-center gap-2">
		{#if Icon}
			<Icon class="h-3 w-3 fill-muted-foreground text-muted-foreground" />
		{/if}
		<span class="text-xs text-muted-foreground">{label}</span>
		<span class="text-xs text-foreground">{value}</span>
	</div>
{/snippet}

<div class="flex flex-col gap-2 rounded-sm border p-2">
	<header class="flex gap-0 justify-between">
		<h3 class="text-lg font-medium text-primary">
			{puppy.name}
		</h3>
	</header>
	<div>
		<img src={puppy.img} alt={puppy.name} class="aspect-square w-full object-cover" />
	</div>
	<div class="flex flex-col gap-2">
		{@render attribute(HeartFilled, 'Breed', puppy.breed)}
		{@render attribute(Location, 'Zip Code', puppy.zip_code)}
		{@render attribute(CountdownTimer, 'Age', puppy.age)}
	</div>
</div>
