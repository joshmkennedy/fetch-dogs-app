<script lang="ts">
	import { SortCategoryOption as SelectedCategory, SortDirectionOption as SelectedDirection } from '$lib/store';
	import DropdownMenu from '$lib/components/ui/dropdown-menu/my-dropdown-menu.svelte';
	import type { SortCategory, SortDirection } from '$lib/types/api';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { updateURLAndRevalidate } from '$lib/utils';
	const sortCategoryOptions = ['breed', 'name', 'age'];
	const sortDirectionOptions = ['asc', 'desc'];

	async function updateSort(){
		await updateURLAndRevalidate(page);
	}
</script>
<div class="flex gap-2 border-muted border p-0.5 rounded-lg">
<DropdownMenu
	bind:buttonText={$SelectedCategory}
	selectedItem={$SelectedCategory}
	onChange={async (selected:SortCategory)=>{
		if(selected.toLowerCase() !== $SelectedCategory){
			$SelectedCategory = selected.toLowerCase() as SortCategory
			await updateSort();
		}
	}}
	items={sortCategoryOptions}
/>
<DropdownMenu
	bind:buttonText={$SelectedDirection}
	selectedItem={$SelectedDirection}
	onChange={async (selected:SortDirection)=>{
		$SelectedDirection = selected.toLowerCase() as SortDirection
		await updateSort();
	}}
	items={sortDirectionOptions}
/>
</div>
