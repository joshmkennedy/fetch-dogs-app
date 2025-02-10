<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { updateURLAndRevalidate } from '$lib/utils';
	import { LocationInfo } from '$lib/store';
	import StateSelect from '$lib/components/state-select.svelte';
	import { Button } from '$lib/components/ui/button';

	let { onSubmit: _onSubmit }: { onSumbit: () => void } = $props();

	let selectedState = $state<string>('');
	let zip = $state<string>('');
	let city = $state<string>('');
	let distance = $state<number>(69);

	onMount(() => {
		if ($LocationInfo) {
			city = $LocationInfo?.city || '';
			selectedState = $LocationInfo?.state || '';
			zip = $LocationInfo?.zip || '';
			distance = $LocationInfo?.distance || 69;
		}
	});

	async function saveLocationInfo(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
		event.preventDefault();
		const submission = {
			enabled: true,
			city: city || null,
			state: selectedState || null,
			zip: zip || null,
			distance: distance
		};
		$LocationInfo = submission;

		_onSubmit();
		await updateURLAndRevalidate(page);
	}
</script>

<div>
	<form onsubmit={saveLocationInfo} class="flex flex-col gap-6">
		<div class="flex flex-col gap-2">
			<div class="flex items-start flex-col gap-2">
				<label for="city">City</label>
				<input class="rounded-sm" type="text" name="city" placeholder="City" bind:value={city} />
			</div>
			<div class="flex flex-col items-start gap-2">
				<label for="state">State</label>
				<StateSelect bind:selectedStateCode={selectedState} />
			</div>
			<div class="flex flex-col gap-2 items-start">
				<label for="zip">Zip</label>
				<input
					class="max-w-[125px] rounded-sm"
					type="text"
					id="zip"
					name="zip"
					placeholder="Zip"
					bind:value={zip}
				/>
			</div>
			<div class="mt-2 flex flex-col gap-2 items-start">
				<label for="distance">How Far should we look?</label>
				<div class="flex items-center gap-2">
					<input
						class="w-full max-w-full"
						type="range"
						id="distance"
						min="25"
						max="150"
						step="10"
						bind:value={distance}
						name="distance"
					/>
					<span
						class="flex-shrink-0 whitespace-nowrap text-sm
					text-muted-foreground">{distance} miles</span
					>
				</div>
			</div>
		</div>
		<Button type="submit">save</Button>
	</form>
</div>
