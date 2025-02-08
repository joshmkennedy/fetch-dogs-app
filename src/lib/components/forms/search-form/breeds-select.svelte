<script lang="ts">
	import Command from '$lib/components/ui/command/my-command.svelte';
	type BreedsSelect = {
		selectedBreeds: { value: string; label?: string }[];
		breeds: string[];
	};
	let { breeds, selectedBreeds = $bindable() }: BreedsSelect = $props();
</script>

<div class="flex flex-col gap-2 rounded-sm border p-3">
	<div class="flex min-h-4 gap-1 overflow-x-auto">
		{#each selectedBreeds as tag}
			<div class="flex rounded-sm border bg-muted pl-2">
				<span class="whitespace-nowrap">{tag.label}</span>
				<button
					type="button"
					class="aspect-square rounded-sm p-1 leading-none hover:bg-white"
					onclick={() => {
						selectedBreeds = selectedBreeds.filter((t) => t.value != tag.value);
					}}
				>
					&times;
				</button>
			</div>
		{/each}
	</div>
	<Command options={breeds} handleClick={(option) => selectedBreeds.push(option)} />
</div>
