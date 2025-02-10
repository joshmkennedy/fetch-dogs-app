<script lang="ts">
	import { LocationInfo } from '$lib/store';
	import * as Dialog from '$lib/components/ui/dialog';
	import Locations from '$lib/components/forms/locations.svelte';

	let isOpen = $state(false);

	const currentLocation = $derived(
		$LocationInfo && $LocationInfo.state
			? `${$LocationInfo.city} ${$LocationInfo.state}, ${$LocationInfo.zip}`
			: 'Set Your Location'
	);
	$effect(() => {
		if ($LocationInfo?.enabled && currentLocation == 'Set Your Location' && isOpen == false) {
			isOpen = true;
		}
	});
</script>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Trigger class="w-fit rounded-sm p-2 text-left hover:bg-muted">
		<span class="block text-xs font-medium text-muted-foreground"> Location: </span>
		{currentLocation}
	</Dialog.Trigger>
	<Dialog.Content class="w-full max-w-[375px]">
		<Dialog.Header>
			<Dialog.Title>Your Location</Dialog.Title>
			<Dialog.Description>Where should we find your buddy from?</Dialog.Description>
			<Locations
				onSubmit={() => {
					isOpen = false;
				}}
			/>
		</Dialog.Header>
	</Dialog.Content>
	<Dialog.Overlay class="bg-purple-500/20 backdrop-blur-sm" />
</Dialog.Root>
