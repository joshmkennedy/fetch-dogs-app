<script lang="ts">
	import { type DropdownMenuContentStaticProps, type DropdownMenuRootProps,DropdownMenu, type WithoutChild } from 'bits-ui';
	import { Check } from 'svelte-radix';

	type Props = DropdownMenuRootProps & {
		buttonText: string;
		items: (string)[];
		selectedItem: string;
		contentProps?: WithoutChild<DropdownMenuContentStaticProps>;
		onChange: (selected:any)=>void;
	};

	let {
		open = $bindable(false),
		children,
		buttonText = $bindable('Open'),
		items,
		selectedItem = $bindable(items[0]),
		onChange,
		contentProps,
		...restProps
	}: Props = $props();
	$effect(() => {
		// hate this but Im running out of time
		if(selectedItem !== buttonText){
			onChange(selectedItem);
		}
	});

</script>

<DropdownMenu.Root bind:open {...restProps}>
	<DropdownMenu.Trigger
		class="flex h-full w-full items-center hover:bg-muted text-primary justify-between rounded-md px-4 py-2 text-sm transition-colors  focus:outline-none focus:ring-0"
	>
		{buttonText}
	</DropdownMenu.Trigger>
	<DropdownMenu.Portal>
		<DropdownMenu.Content {...contentProps} class="text-primary w-full max-w-[375px] bg-background shadow-lg">
			<DropdownMenu.RadioGroup aria-label={buttonText} bind:value={selectedItem}>
				{#each items as item}
					<DropdownMenu.RadioItem
						closeOnSelect={true}
						value={item}
						class="rounded-button flex h-10 w-full select-none items-center py-3 pl-5 pr-1.5 text-sm capitalize outline-none  data-[highlighted]:bg-muted"
					>
						{item}
						{#if selectedItem == item}
							<Check />
						{/if}
					</DropdownMenu.RadioItem>
				{/each}
			</DropdownMenu.RadioGroup>
		</DropdownMenu.Content>
	</DropdownMenu.Portal>
</DropdownMenu.Root>
