<script lang="ts">
	import { Command } from 'bits-ui';
	type OptionsType =
		| string[]
		| Record<string, string[]>;
	let {
		options,
		handleClick,
		label
	}: {
		label:string;
		options: OptionsType;
		handleClick: (option: string) => void;
		selectedValue: string;
	} = $props();
</script>

{#snippet singleGroup(options: string[])}
	<Command.GroupItems class="">
		{#each options as option}
			<Command.Item
				class="flex w-full items-center justify-between rounded-xl px-4 py-2 text-sm transition-colors hover:bg-muted/10 focus:outline-none focus:ring-0"
				onclick={() => handleClick(option)}
			>
				<span class="whitespace-nowrap">{option}</span>
			</Command.Item>
		{/each}
	</Command.GroupItems>
{/snippet}

{#snippet groupedOptions(options: Record<string, string[]>) }
	{#each Object.entries(options) as [heading, innerOptions]}
		<Command.Group class="flex flex-col gap-1">
			<Command.GroupHeading class="text-sm font-medium text-muted-foreground">
				{heading}
			</Command.GroupHeading>
				{@render singleGroup(innerOptions)}
		</Command.Group>
	{/each}
{/snippet}

<Command.Root
	class="flex h-full w-full flex-col divide-y divide-border self-start overflow-hidden rounded-xl border border-muted bg-background"
>
	<Command.Input
		class="focus-override h-input placeholder:text-foreground-alt/50 inline-flex w-[296px] truncate rounded-xl bg-background px-4 text-sm transition-colors focus:outline-none focus:ring-0"
		placeholder={`Search for ${label}...`}
	/>
	<Command.List class="max-h-full overflow-y-auto overflow-x-hidden px-2 pb-2">
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
