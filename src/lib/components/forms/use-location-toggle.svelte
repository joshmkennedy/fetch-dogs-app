<script lang="ts">
	import { tick } from 'svelte';
	import { page } from '$app/state';
	import { updateURLAndRevalidate } from '$lib/utils';
	import { LocationInfo } from '$lib/store';
	import { Switch } from '$lib/components/ui/switch';

	let canUse = $state($LocationInfo?.enabled ?? false);
	LocationInfo.subscribe((locationInfo) => {
		canUse = locationInfo?.enabled ?? false;
	});
	$effect(() => {
		if ($LocationInfo?.enabled !== canUse) {
			$LocationInfo!.enabled = canUse;
		}
	});
</script>

<div class="flex w-fit flex-row-reverse items-center gap-2 px-2 md:ml-auto md:flex-row">
	<label for="use-location" class="text-xs text-muted-foreground">Use Location</label>
	<Switch
		id="use-location"
		bind:checked={canUse}
		class="h-6 w-10 rounded-full bg-muted-foreground"
		onclick={async () => {
			await tick();
			await updateURLAndRevalidate(page);
		}}
	/>
</div>
