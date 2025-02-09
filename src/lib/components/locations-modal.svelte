<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog";
	import {LocationInfo} from '$lib/store';
	import Locations from "$lib/components/forms/locations.svelte";
	let isOpen = $state(false);

	const currentLocation = $derived(($LocationInfo && $LocationInfo.state) ?
	`${$LocationInfo.city} ${$LocationInfo.state}, ${$LocationInfo.zip}` : "Set Your Location")
	$effect(()=>{
		if($LocationInfo?.enabled && !$LocationInfo?.state){
			isOpen = true
		}
	})
</script>
 
<Dialog.Root bind:open={isOpen} >
  <Dialog.Trigger class="text-left p-2 rounded-sm hover:bg-muted w-fit">
		<span class="font-medium text-xs text-muted-foreground block">
			Location:
		</span>
		{currentLocation}
	</Dialog.Trigger>
  <Dialog.Content class="w-full max-w-[375px]">
    <Dialog.Header >
      <Dialog.Title>Your Location</Dialog.Title>
      <Dialog.Description>
				Where should we find your buddy from?
      </Dialog.Description>
			<Locations onSubmit={()=>{isOpen = false}}/>
    </Dialog.Header>
  </Dialog.Content>
	<Dialog.Overlay class="bg-purple-500/20 backdrop-blur-sm" />

</Dialog.Root>

