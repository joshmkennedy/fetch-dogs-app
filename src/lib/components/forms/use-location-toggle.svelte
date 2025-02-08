<script lang="ts">
	import { Switch } from '../ui/switch';
	import { LocationInfo } from '$lib/store';

	let canUse = $state($LocationInfo?.enabled ?? false);
	LocationInfo.subscribe((locationInfo) => {
		canUse = locationInfo?.enabled ?? false;
	});
	$effect(() => {
		$LocationInfo!.enabled = canUse;
	});
</script>

<div class="flex gap-2">
	<Switch
		id="use-location"
		bind:checked={canUse}
		class="h-6 w-10 rounded-full bg-muted-foreground"
	/>
	<label for="use-location" class=""> Use Location? </label>
</div>
