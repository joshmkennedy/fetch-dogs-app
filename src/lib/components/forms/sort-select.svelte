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

	const sortCategoryOptions = ['breed', 'name', 'age'];
	const sortDirectionOptions = ['asc', 'desc'];

	onMount(() => {
		if (page.url.searchParams.has('sort')) {
			const [cat, dir] = page.url.searchParams.get('sort')?.split(':');
			$SelectedCategory = cat;
			$SelectedDirection = dir;
		}
	});

	async function updateSort() {
		await updateURLAndRevalidate(page);
	}
</script>

<div class="flex gap-0.5 rounded-lg border border-muted p-0.5">
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
	<span class="h-full w-[1px] bg-border"></span>
	<DropdownMenu
		bind:buttonText={$SelectedDirection}
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
