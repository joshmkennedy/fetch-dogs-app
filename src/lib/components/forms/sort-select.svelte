<script lang="ts">
	import {
		SortCategoryOption as SelectedCategory,
		SortDirectionOption as SelectedDirection
	} from '$lib/store';
	import DropdownMenu from '$lib/components/ui/dropdown-menu/my-dropdown-menu.svelte';
	import type { SortCategory, SortDirection } from '$lib/types/api';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { updateURLAndRevalidate } from '$lib/utils';
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

<div class="flex gap-2 rounded-lg border border-muted p-0.5">
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
