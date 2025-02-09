<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import * as Dialog from './ui/dialog';

	let {
		disableOnDevice,
		children,
		trigger
	}: { disableOnDevice: string; trigger: Snippet; children: Snippet } = $props();

	let breakpoint = disableOnDevice == 'md' ? 'md:hidden' : 'lg:hidden';

</script>

<Dialog.Root >
	<Dialog.Trigger class={`rounded-sm p-2  text-left hover:bg-muted ${breakpoint}`}>
		{@render trigger?.()}
	</Dialog.Trigger>
	<Dialog.Content class="w-full max-w-[375px] max-h-[600px] overflow-y-hidden">
		{@render children?.()}
	</Dialog.Content>
</Dialog.Root>
<div>
	{@render children()}
</div>
