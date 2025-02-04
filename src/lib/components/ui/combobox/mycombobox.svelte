<script lang="ts">
	import { Combobox } from 'bits-ui';
	import { flyAndScale } from '$lib/utils';
	import { tick } from 'svelte';
	export let name = 'result';
	export let onChange: (value: { label?: string; value: string } | undefined) => void;
	export let options: { label: string; value: string }[] = [];
	export let label = 'Search';

	let inputValue = '';
	let touchedInput = false;

	$: filteredOptions =
		inputValue && touchedInput
			? options.filter((option) => option.value.toLowerCase().includes(inputValue.toLowerCase()))
			: options;
</script>

<Combobox.Root
	items={filteredOptions}
	bind:inputValue
	bind:touchedInput
	onSelectedChange={async (v) => {
		onChange(v);
		await tick()
		inputValue = '';
		touchedInput=false
	}}
>
	<div class="relative">
		<Combobox.Input
			class="h-input rounded-sm border-slate-300 placeholder:text-foreground-alt/50 inline-flex w-[296px] truncate border bg-background px-8 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background"
			placeholder={label}
			aria-label={label}
		/>
	</div>

	<Combobox.Content
		class="w-full rounded-xl border border-muted bg-background px-1 py-3 shadow-popover outline-none"
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
