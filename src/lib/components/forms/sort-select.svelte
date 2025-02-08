<script lang="ts">
	import { SortCategoryOption as SelectedCategory, SortDirectionOption as SelectedDirection } from '$lib/store';
	import DropdownMenu from '$lib/components/ui/dropdown-menu/my-dropdown-menu.svelte';
	import type { SortCategory, SortDirection } from '$lib/types/api';
	const sortCategoryOptions = ['breed', 'name', 'age'];
	const sortDirectionOptions = ['asc', 'desc'];
</script>
<div class="flex gap-2 border-muted border p-0.5 rounded-lg">
<DropdownMenu
	bind:buttonText={$SelectedCategory}
	selectedItem={$SelectedCategory}
	onChange={(selected:SortCategory)=>{
		$SelectedCategory = selected.toLowerCase() as SortCategory
	}}
	items={sortCategoryOptions}
/>
<DropdownMenu
	bind:buttonText={$SelectedDirection}
	selectedItem={$SelectedDirection}
	onChange={(selected:SortDirection)=>{
		$SelectedDirection = selected.toLowerCase() as SortDirection
	}}
	items={sortDirectionOptions}
/>
</div>
