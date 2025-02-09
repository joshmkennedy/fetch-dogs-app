<script lang="ts">
	import { Favorites, initializeSelectedBreeds, Matched, SelectedBreeds } from '$lib/store';
	import { Button } from './button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { redirect } from '@sveltejs/kit';
	import { arraysAreEqual } from '$lib/utils';

	function resetMatched() {
		$Matched = undefined;
	}
	function resetFavorites() {
		$Favorites = [];
	}

	function fullReset() {
		resetMatched();
		resetFavorites();
		goto('/',{invalidateAll:true});
	}
</script>

{#if $Matched && $Matched.id}
	<Dialog.Root
		open={Boolean($Matched && $Matched.id)}
		onOpenChange={(open) => {
			console.log(open);
		}}
	>
		<Dialog.Content class="w-full min-w-[375px] max-w-[600px]">
			<Dialog.Header>
				<Dialog.Title>Matched</Dialog.Title>
				<Dialog.Description>
					You have been matched with {$Matched.name}
				</Dialog.Description>
			</Dialog.Header>
			<div class="">
				<img src={$Matched.img} alt={$Matched.id} class="h-full w-full object-cover" />
			</div>

			<div class="flex justify-end gap-2">
				<Button onclick={fullReset} class=" bg-muted text-foreground hover:bg-muted">Reset</Button>
				<Button onclick={resetMatched} class="">Keep Searching</Button>
			</div>
		</Dialog.Content>
	</Dialog.Root>
{/if}
