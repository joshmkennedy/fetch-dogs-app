<script lang="ts">
	import { Favorites, Matched } from '$lib/store';
	import FavoritesCarousel from './favorites-carousel.svelte';
	import { Button } from './ui/button';
	import * as Dialog from './ui/dialog';
	let isOpen = $state(false);

	async function getMatched() {
		const res = await fetch(`/api/get-matched`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				dogs: $Favorites
			})
		}).then((res) => res.json());
		if (res.matched) {
			$Matched = res.matched;
		}
	}
	$effect(() => {
		if ($Favorites.length==0) {
			isOpen = false;
		}
	});
</script>

<div>
	<Dialog.Root bind:open={isOpen}>
		<h2 class="mb-2 text-sm font-medium text-muted-foreground">Favorites</h2>
		<div class="min-h-[45px] flex items-center gap-2">
			{#if $Favorites.length}
				<Dialog.Trigger class="rounded-sm p-2 text-left hover:bg-muted">
					<div class="flex items-center gap-2">
						{#each $Favorites as dog}
							<img src={dog.img} alt={dog.id} class="h-10 w-10 rounded-full" />
						{/each}
					</div>
				</Dialog.Trigger>

				<Button onclick={getMatched}>Get Matched</Button>
			{:else}
				<p class="text-sm text-slate-400">Heart your favorites to get matched</p>
			{/if}
		</div>
		<Dialog.Content class="w-fit min-w-[375px] max-w-[600px]">
			<Dialog.Header>
				<Dialog.Title>Favorites</Dialog.Title>
				<Dialog.Description>Here are your favorites.</Dialog.Description>
			</Dialog.Header>
			<div class="relative overflow-hidden">
				<FavoritesCarousel {getMatched} />
			</div>
		</Dialog.Content>
	</Dialog.Root>
</div>
