<script lang="ts">
	import { Combobox } from 'bits-ui';
	import { CaretUp, CaretSort, HeartFilled, Check, CaretDown } from 'svelte-radix';

	let {
		options,
		name,
		label,
		inputValue,
		value = $bindable()
	}: {
	value:string;
		options: { value: string; label: string }[];
		name: string;
		label: string;
		inputValue: string;
	} = $props();

	let searchValue = $state(inputValue);
	$effect(()=>{
		console.log(searchValue)
	})

	const filteredOptions = $derived(
		searchValue === ''
			? options
			: options.filter(
					(option) =>
						option.label.toLowerCase().includes(searchValue.toLowerCase()) ||
						option.value.toLowerCase().includes(searchValue.toLowerCase())
				)
	);
</script>

<Combobox.Root
	type="single"
	{name}
	bind:value
>
	<div class="relative">
		<Combobox.Input
			defaultValue={inputValue ?? "non set"}
			oninput={(e) => (searchValue = e.currentTarget.value)}
			class="rounded-sm border-border-input placeholder:text-foreground-alt/50 inline-flex w-full truncate border
			bg-background px-11 pl-3 transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background"
			placeholder={label}
			aria-label={`Search ${label}`}
		/>
		<Combobox.Trigger class="absolute end-3 top-1/2 size-6 -translate-y-1/2">
			<CaretSort class="size-6 text-muted-foreground" />
		</Combobox.Trigger>
	</div>
		<Combobox.Content
			class="max-h-[200px] w-[var(--bits-combobox-anchor-width)] min-w-[var(--bits-combobox-anchor-width)] rounded-xl border border-muted bg-background px-1 py-3 shadow-popover outline-none"
			sideOffset={10}
		>
			<Combobox.ScrollUpButton class="flex w-full items-center justify-center">
				<CaretUp class="size-3" />
			</Combobox.ScrollUpButton>
			<Combobox.Viewport class="p-1">
				{#each filteredOptions as option, i (i + option.value)}
					<Combobox.Item
						class="rounded-button flex h-10 w-full select-none items-center py-3 pl-5 pr-1.5 text-sm capitalize outline-none  data-[highlighted]:bg-muted"
						value={option.value}
						label={option.label}
					>
						{#snippet children({ selected })}
							{option.label}
							{#if selected}
								<div class="ml-auto">
									<Check />
								</div>
							{/if}
						{/snippet}
					</Combobox.Item>
				{:else}
					<span class="block px-5 py-2 text-sm text-muted-foreground">
						No results found, try again.
					</span>
				{/each}
			</Combobox.Viewport>
			<Combobox.ScrollDownButton class="flex w-full items-center justify-center">
				<CaretDown class="size-3" />
			</Combobox.ScrollDownButton>
		</Combobox.Content>
</Combobox.Root>
