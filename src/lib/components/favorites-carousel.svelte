<script lang="ts">
	import { ArrowLeft, ArrowRight } from 'svelte-radix';
	import { Favorites } from '$lib/store';
	import PuppyCard from './puppy-card.svelte';
	import * as Carousel from '$lib/components/ui/carousel/index';
	import type { CarouselAPI } from '$lib/components/ui/carousel/context';
	import Button from '$lib/components/ui/button/button.svelte';

	let api: CarouselAPI;
	$effect(() => {
		if (api) {
			api.on('select', console.log);
		}
	});
</script>

<Carousel.Root class="w-full" data-hi bind:api>
	<Carousel.Content class="">
		{#each $Favorites as dog}
			<Carousel.Item class="w-full min-w-full">
				<div class="mx-auto flex max-w-[400px] flex-col gap-2">
					<PuppyCard puppy={dog} />
					<Button
						onclick={() => ($Favorites = $Favorites.filter((f) => f.id != dog.id))}
						class="border bg-white text-xs text-pink-600 shadow-none hover:border-red-200 hover:bg-red-100"
					>
						Remove
					</Button>
				</div>
			</Carousel.Item>
		{/each}
	</Carousel.Content>
	<div class="absolute top-[50%] w-full">
		<Button
			class="absolute bottom-[50%] right-0 bg-white text-foreground hover:bg-muted"
			onclick={() => api && api.scrollNext()}
		>
			<ArrowRight class="h-4 w-4" />
		</Button>
		<Button
			class="absolute bottom-[50%] left-0 bg-white text-foreground hover:bg-muted"
			onclick={() => api && api.scrollPrev()}
		>
			<ArrowLeft class="h-4 w-4" />
		</Button>
	</div>
</Carousel.Root>
