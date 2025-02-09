<script lang="ts">
	import { Switch } from '../ui/switch';
	import { LocationInfo } from '$lib/store';
	import { updateURLAndRevalidate } from '$lib/utils';
	import { page } from '$app/state';
	import { tick } from 'svelte';

	let canUse = $state($LocationInfo?.enabled ?? false);
	LocationInfo.subscribe((locationInfo) => {
		canUse = locationInfo?.enabled ?? false;
	});
	$effect(() => {
		if($LocationInfo?.enabled !== canUse){
			$LocationInfo!.enabled = canUse;
		}
	});
</script>

<div class="flex px-2 gap-2 items-center md:ml-auto flex-row-reverse md:flex-row w-fit">
	<label for="use-location" class="text-xs text-muted-foreground">Use Location</label>
	<Switch
		id="use-location"
		bind:checked={canUse}
		class="h-6 w-10 rounded-full bg-muted-foreground"
		onclick={async ()=>{
			await tick();
			await updateURLAndRevalidate(page);
		}}
	/>
</div>
