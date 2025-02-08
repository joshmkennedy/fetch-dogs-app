<script lang="ts">
	import Command from '$lib/components/ui/command/my-command.svelte';
	import { SelectedBreeds } from '$lib/store';
	type BreedsSelect = {
		breeds: string[];
	};
	let { breeds }: BreedsSelect = $props();

	function findAndSelect(option: string) {
		console.log(option)
		$SelectedBreeds.push(option);
		$SelectedBreeds = $SelectedBreeds;
	}
</script>

<div class="flex flex-col gap-2 rounded-sm border p-3">
	<div class="flex min-h-4 gap-1 overflow-x-auto">
		{#each $SelectedBreeds as tag}
			<div class="flex rounded-sm border bg-muted pl-2">
				<span class="whitespace-nowrap">{tag}</span>
				<button
					type="button"
					class="aspect-square rounded-sm p-1 leading-none hover:bg-white"
					onclick={() => {
						$SelectedBreeds = $SelectedBreeds.filter((t) => t != tag);
					}}
				>
					&times;
				</button>
			</div>
		{/each}
	</div>
	<Command label="Breeds" options={breeds} handleClick={(option) => findAndSelect(option)} />
</div>
