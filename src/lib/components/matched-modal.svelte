<script lang="ts">
	import { Favorites, Matched } from '$lib/store';
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { goto } from '$app/navigation';

	function resetMatched() {
		$Matched = undefined;
	}
	function resetFavorites() {
		$Favorites = [];
	}

	function fullReset() {
		resetMatched();
		resetFavorites();
		goto('/', { invalidateAll: true });
	}
</script>

{#if $Matched && $Matched.id}
	<Dialog.Root
		open={Boolean($Matched && $Matched.id)}
		onOpenChange={(open) => {
			if (!open && $Matched && $Matched.id) {
				$Matched = undefined;
			}
		}}
	>
		<Dialog.Content class="w-full min-w-[375px] max-w-[600px]">
			<Dialog.Header>
				<Dialog.Title class="text-2xl text-primary">Matched</Dialog.Title>
				<Dialog.Description>
					You have been matched with {$Matched.name}
				</Dialog.Description>
			</Dialog.Header>
			<div class="">
				<img
					src={$Matched.img}
					alt={$Matched.id}
					class="aspect-square h-full w-full object-cover"
				/>
			</div>

			<div class="flex justify-end gap-2">
				<Button onclick={fullReset} class=" bg-muted text-foreground hover:bg-muted">Reset</Button>
				<Button onclick={resetMatched} class="">Keep Searching</Button>
			</div>
		</Dialog.Content>
		<Dialog.Overlay class="bg-purple-500/20 backdrop-blur-sm" />
	</Dialog.Root>
{/if}
