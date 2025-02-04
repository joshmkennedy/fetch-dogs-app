<script lang="ts">
	import Combobox from '$lib/components/ui/combobox/mycombobox.svelte';
	type BreedsSelect = {
		tags: { value: string; label?: string }[];
		breeds: string[];
	};
	let { breeds, tags=$bindable() }: BreedsSelect = $props();
</script>

<div class="flex flex-col gap-2 rounded-sm border p-3">
	<div class="flex min-h-4 gap-1 overflow-x-auto">
		{#each tags as tag}
			<div class="rounded-sm border bg-muted pl-2 flex">
				<span class="whitespace-nowrap">{tag.label}</span>
				<button class="aspect-square rounded-sm p-1 leading-none hover:bg-white"
				onclick={()=>{
					tags = tags.filter(t=>t.value != tag.value)
				}}>&times;</button>
			</div>
		{/each}
	</div>
	<Combobox
		label="Select Dog Breeds"
		options={breeds.map((b: string) => ({ value: b, label: b }))}
		onChange={(value) => {
			if (!value) return;
			tags.push(value);
		}}
	/>
</div>
