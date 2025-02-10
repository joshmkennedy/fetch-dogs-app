<script lang="ts">
	import { page } from '$app/state';
	import { Plus } from 'svelte-radix';
	import { updateURLAndRevalidate } from '$lib/utils';
	import { SelectedBreeds } from '$lib/store';
	import { BREEDIMAGES } from '$lib/config';
	import Command from '$lib/components/ui/command/my-command.svelte';
	import * as Dialog from '$lib/components/ui/dialog';

	type BreedsSelect = {
		breeds: string[];
	};

	let { breeds }: BreedsSelect = $props();

	let breedsAsOptions = $derived({
		['Filtering By:']: $SelectedBreeds,
		'Add to Filter': breeds.filter((b) => !$SelectedBreeds.includes(b))
	});

	async function findAndToggle(option: string) {
		if ($SelectedBreeds.includes(option)) {
			$SelectedBreeds = $SelectedBreeds.filter((b) => b != option);
		} else {
			$SelectedBreeds.push(option);
		}
		$SelectedBreeds = $SelectedBreeds;
		await updateURLAndRevalidate(page);
	}
</script>

{#snippet breedItem(breedName: string)}
	<div
		class="flex w-full items-center gap-2"
		title={`Click to ${$SelectedBreeds.includes(breedName) ? 'remove' : 'add'}`}
	>
		<img
			src={BREEDIMAGES[breedName as keyof typeof BREEDIMAGES]}
			alt={breedName}
			width="45"
			height="45"
			class="aspect-square h-[45px] w-[45px] rounded-full bg-muted object-cover"
		/>

		<span class="whitespace-nowrap text-xs md:text-base">{breedName}</span>
		<div class="ml-auto">
			{#if $SelectedBreeds.includes(breedName)}
				<span class="text-xs text-muted-foreground">&times;</span>
			{:else}
				<Plus class="h-3 w-3 shrink-0 fill-muted-foreground" />
			{/if}
		</div>
	</div>
{/snippet}

{#snippet mainComponent()}
	<div class="flex flex-col gap-2 rounded-sm md:border md:p-3">
		<h3 class="text-sm font-medium text-muted-foreground">Filter By Breed</h3>
		<div class="relative flex min-h-4 w-full shrink-0 -space-x-4 overflow-x-auto">
			{#each $SelectedBreeds as tag}
				<button
					type="button"
					class="relative aspect-square h-[45px] w-[45px] shrink-0 rounded-full p-1 leading-none hover:z-10 hover:bg-muted"
					title="Click to Remove"
					onclick={async () => {
						$SelectedBreeds = $SelectedBreeds.filter((t) => t != tag);
						await updateURLAndRevalidate(page);
					}}
				>
					<img
						src={BREEDIMAGES[tag as keyof typeof BREEDIMAGES]}
						alt={tag}
						width="45"
						height="45"
						class="aspect-square h-full w-full rounded-full bg-muted object-cover"
					/>
				</button>
			{/each}
		</div>
		<Command
			label="Breeds"
			options={breedsAsOptions}
			itemsComp={breedItem}
			handleClick={(option) => findAndToggle(option)}
		/>
	</div>
{/snippet}

<Dialog.Root>
	<Dialog.Trigger class={`w-full rounded-sm border p-2 text-left hover:bg-muted md:hidden`}>
		<div class="flex items-center gap-2 text-xs text-muted-foreground">
			<div class="whitespace-nowrap">Open Breed Filter</div>
			<div class="relative flex min-h-[45px] w-full -space-x-4 overflow-x-auto">
				{#each $SelectedBreeds.slice(0, 5) as tag}
					<img
						src={BREEDIMAGES[tag as keyof typeof BREEDIMAGES]}
						alt={tag}
						width="45"
						height="45"
						class="aspect-square h-[45px] w-[45px] shrink-0 rounded-full bg-muted object-cover"
					/>
				{/each}
			</div>
		</div>
	</Dialog.Trigger>

	<Dialog.Content class=" max-h-[600px] w-[calc(100%-8px)] max-w-[375px] overflow-y-hidden p-2">
		{@render mainComponent()}
	</Dialog.Content>
</Dialog.Root>
<div class="hidden md:block">
	{@render mainComponent()}
</div>
