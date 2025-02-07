<script lang="ts">
	import { Combobox } from 'bits-ui';
	import { flyAndScale } from '$lib/utils';
	import { tick } from 'svelte';
	import { CaretSort} from 'svelte-radix';
	export let name = '';
	export let onChange: (value: { label?: string; value: string } | undefined) => void;
	export let options: { label: string; value: string }[] = [];
	export let label = 'Search';
	export let removeOnSelect: boolean = true;

	let value:{ label?: string; value: string } = {label:"", value:""};
	let open = false;

	let hasIcon = $$slots['icon'];

	export let inputValue = '';

	let touchedInput = false;

	$: filteredOptions =
		inputValue && touchedInput
			? options.filter(
					(option) =>
						option.value.toLowerCase().includes(inputValue.toLowerCase()) ||
						option.label.toLowerCase().includes(inputValue.toLowerCase())
				)
			: options;
</script>

<Combobox.Root
	items={filteredOptions}
	bind:selected={value}
	bind:open
	bind:inputValue
	bind:touchedInput
	
	onSelectedChange={async (v) => {
		onChange(v);
		if (removeOnSelect) {
			await tick();
			inputValue = '';
			touchedInput = false;
			value = {label:"", value:""}
		}
	}}
>
	<div class="relative w-full">
		{#if hasIcon}
			<span class="absolute left-0 top-0 flex h-full items-center justify-center px-1">
				<slot name="icon" />
			</span>
		{/if}
		<Combobox.Input
			bind:value={inputValue}
			class={`rounded-sm text-base placeholder:text-foreground-alt/50 inline-flex w-full
			truncate border bg-background pr-10 transition-colors
			focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2
			focus:ring-offset-background ${hasIcon ? 'pl-10' : ''}`}
			placeholder={label}
			aria-label={label}
			autocomplete="off"
		/>
		<div class="absolute right-0 top-0 flex h-full items-center justify-center p-1">
		<button
			type="button"
			class="	hover:bg-muted px-1"
			on:click={()=>(open = !open)}
		>
			<CaretSort />
		</button>
		<button type="button" on:click={()=>{
			inputValue = ""
			touchedInput = false
			open = false
			value = {label:"", value:""}
		}}>clear</button>
		</div>
	</div>

	<Combobox.Content
		class="max-h-96 w-full overflow-auto rounded-xl border border-muted bg-background px-1 py-3 shadow-popover outline-none"
		transition={flyAndScale}
		sideOffset={8}
	>
		{#each filteredOptions as option (option.value)}
			<Combobox.Item
				class="rounded-button flex h-10 w-full select-none items-center py-3 pl-5 pr-1.5 text-sm capitalize outline-none transition-all duration-75 data-[highlighted]:bg-muted"
				value={option.value}
				label={option.label}
			>
				{option.label}
				<Combobox.ItemIndicator class="ml-auto" asChild={false}>✅</Combobox.ItemIndicator>
			</Combobox.Item>
		{:else}
			<span class="block px-5 py-2 text-sm text-muted-foreground"> No results found </span>
		{/each}
	</Combobox.Content>
	<Combobox.HiddenInput {name} />
</Combobox.Root>
