<script lang="ts">
	import {
		type DropdownMenuContentStaticProps,
		type DropdownMenuRootProps,
		DropdownMenu,
		type WithoutChild
	} from 'bits-ui';
	import type { Snippet } from 'svelte';
	import { Check } from 'svelte-radix';

	type Props = DropdownMenuRootProps & {
		buttonText: string | Snippet;
		items: string[] | { label: string; value: string; renderFn?: Snippet }[];
		selectedItem: string;
		label?: string;
		contentProps?: WithoutChild<DropdownMenuContentStaticProps>;
		onChange: (selected: any) => void;
	};

	let {
		open = $bindable(false),
		children,
		buttonText = $bindable('Open'),
		items,
		label = $bindable('Open'),
		selectedItem = $bindable(typeof items[0] == 'object' ? items[0].value : (items[0] as string)),
		onChange,
		contentProps,
		...restProps
	}: Props = $props();
	$effect(() => {
		// hate this but Im running out of time
		if (selectedItem !== buttonText) {
			onChange(selectedItem);
		}
	});
</script>

<DropdownMenu.Root bind:open {...restProps}>
	<DropdownMenu.Trigger
		class="flex w-full items-center capitalize justify-between rounded-md px-4 py-2 text-sm text-primary transition-colors hover:bg-muted  focus:outline-none focus:ring-0"
	>
		{#if typeof buttonText == 'string'}
			{buttonText}
		{:else}
			{@render buttonText()}
		{/if}
	</DropdownMenu.Trigger>
	<DropdownMenu.Portal>
		<DropdownMenu.Content
			{...contentProps}
			class="w-full max-w-[375px] bg-background text-primary shadow-lg"
		>
			<DropdownMenu.RadioGroup aria-label={label} bind:value={selectedItem}>
				{#each items as item}
					<DropdownMenu.RadioItem
						closeOnSelect={true}
						value={typeof item == 'object' ? item.value : item}
						class={`rounded-button flex h-10 w-full select-none items-center
						py-3 pl-5 pr-1.5 text-sm capitalize outline-none
						data-[highlighted]:bg-muted/40 data-[highlighted]:cursor-pointer ${selectedItem == item || (typeof item == 'object' && item.value == selectedItem) ? 'bg-muted' : ''}`}
					>
							{console.log(item)}
						{#if typeof item == 'object' }
							{@render item.renderFn?.()}
						{:else if typeof item == 'object' && item.label}
							{item.label}
						{:else}
							{item}
						{/if}
						{#if selectedItem == item || (typeof item == 'object' && item.value == selectedItem)}
							<Check class="h-4 w-4" />
						{/if}
					</DropdownMenu.RadioItem>
				{/each}
			</DropdownMenu.RadioGroup>
		</DropdownMenu.Content>
	</DropdownMenu.Portal>
</DropdownMenu.Root>
