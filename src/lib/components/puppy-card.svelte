<script lang="ts">
	import type { ComponentType } from 'svelte';
	import HeartFilled from 'svelte-radix/HeartFilled.svelte';
	import { CountdownTimer } from 'svelte-radix';
	import Heart from 'svelte-radix/Heart.svelte';
	import { Favorites } from '$lib/store';
	import type { Dog } from '$lib/types/api';
	import Location from '$lib/components/ui/icons/location.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	const { puppy }: { puppy: Dog } = $props();

	function toggleFav(puppy: Dog) {
		if ($Favorites && $Favorites.some((p) => p.id == puppy.id)) {
			$Favorites = $Favorites.filter((f) => f.id != puppy.id);
		} else {
			$Favorites.push(puppy);
		}
		$Favorites = $Favorites;
	}
</script>

{#snippet attribute(Icon: ComponentType, label: string, value: string)}
	<div class="flex items-center gap-2">
		{#if Icon}
			<Icon class="h-3 w-3 fill-muted-foreground text-muted-foreground" />
		{/if}
		<span class="text-xs text-muted-foreground">{label}</span>
		<span class="text-xs text-foreground">{value}</span>
	</div>
{/snippet}

<div class="flex min-w-full flex-col gap-2 rounded-sm border p-2">
	<header class="flex items-baseline justify-between gap-0">
		<h3 class="text-lg font-medium text-primary">
			{puppy.name}
		</h3>
		<div>
			<Button
				class="h-8 w-8 bg-transparent shadow-none hover:bg-muted"
				onclick={() => toggleFav(puppy)}
			>
				{#if $Favorites && $Favorites.some((p) => p.id == puppy.id)}
					<HeartFilled class="h-3 w-3 shrink-0 fill-primary" />
				{:else}
					<Heart class="h-3 w-3 shrink-0 text-muted-foreground" />
				{/if}
			</Button>
		</div>
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
