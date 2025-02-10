<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import {
		SortCategoryOption as SelectedCategory,
		SortDirectionOption as SelectedDirection
	} from '$lib/store';
	import { updateURLAndRevalidate } from '$lib/utils';
	import type { SortCategory, SortDirection } from '$lib/types/api';
	import DropdownMenu from '$lib/components/ui/dropdown-menu/my-dropdown-menu.svelte';
	import { ArrowDown, ArrowUp } from 'svelte-radix';

	const sortCategoryOptions = ['breed', 'name', 'age'];
	const sortDirectionOptions = [
		{ value: 'asc', label: 'Ascending', renderFn: ascendingArrow },
		{ value: 'desc', label: 'Descending', renderFn: descendingArrow }
	];

	onMount(() => {
		if (page.url.searchParams.has('sort')) {
			const [cat, dir] = (page.url.searchParams.get('sort')?.split(':') ?? ['breed', 'asc']) as [
				SortCategory,
				SortDirection
			];
			$SelectedCategory = cat;
			$SelectedDirection = dir;
		}
	});

	async function updateSort() {
		await updateURLAndRevalidate(page);
	}
</script>

{#snippet ascendingArrow()}
	<ArrowUp class="text-primary h-4 w-4" />
{/snippet}

{#snippet descendingArrow()}
	<ArrowDown class="h-4 w-4 text-primary" />
{/snippet}

<div>
	<label for="sort-by" class="text-xs text-muted-foreground">Sort By</label>
	<div class="flex gap-0.5 rounded-lg border items-stretch border-muted p-0.5">
		<DropdownMenu
			bind:buttonText={$SelectedCategory}
			selectedItem={$SelectedCategory}
			onChange={async (selected: SortCategory) => {
				if (selected.toLowerCase() !== $SelectedCategory) {
					$SelectedCategory = selected.toLowerCase() as SortCategory;
					await updateSort();
				}
			}}
			items={sortCategoryOptions}
		/>
		<span class=" w-[2px] bg-muted block"></span>
		<DropdownMenu
			buttonText={$SelectedDirection === 'asc' ? ascendingArrow : descendingArrow}
			selectedItem={$SelectedDirection}
			onChange={async (selected: SortDirection) => {
				if (selected.toLowerCase() !== $SelectedDirection) {
					$SelectedDirection = selected.toLowerCase() as SortDirection;

					await updateSort();
				}
			}}
			items={sortDirectionOptions}
		/>
	</div>
</div>
