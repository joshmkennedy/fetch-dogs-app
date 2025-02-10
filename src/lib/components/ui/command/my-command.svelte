<script lang="ts">
	import { Command } from 'bits-ui';
	import type { Snippet } from 'svelte';
	type OptionsType = string[] | Record<string, string[]>;
	let {
		options,
		handleClick,
		label,
		itemsComp
	}: {
		label: string;
		itemsComp: Snippet<[string]>;
		options: OptionsType;
		handleClick: (option: string) => void;
	} = $props();

	let inputValue = $state('');
</script>

{#snippet singleGroup(options: string[])}
	<Command.GroupItems class="">
		{#each options as option}
			<Command.Item
				class="flex w-full items-center justify-between rounded-xl px-4 py-2 text-sm transition-colors hover:bg-muted focus:outline-none focus:ring-0 data-[selected]:bg-muted"
				onclick={() => (inputValue = '') || handleClick(option)}
			>
				{#if itemsComp}
					{@render itemsComp(option)}
				{:else}
					<span class="whitespace-nowrap">{option}</span>
				{/if}
			</Command.Item>
		{/each}
	</Command.GroupItems>
{/snippet}

{#snippet groupedOptions(options: Record<string, string[]>)}
	{#each Object.entries(options) as [heading, innerOptions]}
		<Command.Group class="flex flex-col gap-1">
			<Command.GroupHeading
				class="py-3 text-[10px] font-medium uppercase text-muted-foreground text-muted-foreground/60"
			>
				{heading}
			</Command.GroupHeading>
			{@render singleGroup(innerOptions)}
		</Command.Group>
		<Command.Separator class="my-3.5 h-px bg-border" />
	{/each}
{/snippet}

<Command.Root
	class="flex h-full w-full flex-col gap-3 self-start overflow-hidden bg-background text-primary"
>
	<Command.Input
		bind:value={inputValue}
		class="focus-override h-input placeholder:text-foreground-alt/50 inline-flex w-full truncate rounded-sm border border-slate-200 bg-background px-4 text-sm transition-colors focus:outline-none focus:ring-0"
		placeholder={`Search for ${label}...`}
	/>
	<Command.List class="h-[400px] overflow-y-auto overflow-x-hidden px-2 pb-2 md:h-[85vh]">
		<Command.Viewport>
			<Command.Empty
				class="flex w-full items-center justify-center pb-6 pt-8 text-sm text-muted-foreground"
			>
				No results found.
			</Command.Empty>

			{#if Array.isArray(options)}
				<Command.Group>
					{@render singleGroup(options)}
				</Command.Group>
			{:else}
				{@render groupedOptions(options)}
			{/if}
		</Command.Viewport>
	</Command.List>
</Command.Root>
