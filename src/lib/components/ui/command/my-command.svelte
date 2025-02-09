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
				class="flex w-full items-center justify-between rounded-xl px-4 py-2 text-sm transition-colors data-[selected]:bg-muted hover:bg-muted focus:outline-none focus:ring-0"
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
			<Command.GroupHeading class="text-[10px] text-muted-foreground/60 uppercase py-3 font-medium text-muted-foreground">
				{heading}
			</Command.GroupHeading>
			{@render singleGroup(innerOptions)}
		</Command.Group>
		<Command.Separator class="h-px bg-border my-3.5" />
	{/each}
{/snippet}

<Command.Root
	class="flex h-full w-full flex-col self-start overflow-hidden bg-background gap-3 text-primary"
>
	<Command.Input
		bind:value={inputValue}
		class="focus-override h-input border placeholder:text-foreground-alt/50 inline-flex w-full truncate border-slate-200 bg-background px-4 text-sm transition-colors rounded-sm focus:outline-none focus:ring-0"
		placeholder={`Search for ${label}...`}
	/>
	<Command.List class="h-[400px] md:h-[85vh] overflow-y-auto overflow-x-hidden px-2 pb-2">
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
