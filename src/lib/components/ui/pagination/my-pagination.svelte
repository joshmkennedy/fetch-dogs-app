<script lang="ts">
	import { Pagination } from 'bits-ui';
	import { CaretLeft, CaretRight } from 'svelte-radix';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	let { count, navigate, perPage, currentPage } = $props();
	console.log(currentPage);
	console.log(perPage, currentPage, count);
</script>

<Pagination.Root
	{count}
	bind:page={currentPage}
	{perPage}
	onPageChange={(p) => {
		page.url.searchParams.set('from', ((p - 1) * perPage).toString());
		goto(page.url.toString(), { invalidateAll: true });
	}}
>
	{#snippet children({ pages, range })}
		<div class="my-8 flex items-center justify-center">
			<Pagination.PrevButton
				class="active:scale-98 mr-[25px] inline-flex size-10 items-center justify-center rounded-[9px] bg-transparent hover:bg-muted disabled:cursor-not-allowed disabled:text-muted-foreground hover:disabled:bg-transparent"
			>
				<CaretLeft class="size-6" />
			</Pagination.PrevButton>
			<div class="flex items-center gap-2.5">
				{#each pages as page (page.key)}
					{#if page.type === 'ellipsis'}
						<div class="text-foreground-alt select-none text-[15px] font-medium">...</div>
					{:else}
						<Pagination.Page
							{page}
							class="active:scale-98 inline-flex size-10 select-none items-center
							justify-center rounded-[9px] bg-transparent text-[15px]
							font-medium hover:bg-muted hover:text-primary disabled:cursor-not-allowed
							disabled:opacity-50 hover:disabled:bg-transparent
							data-[selected]:bg-primary data-[selected]:text-background"
						>
							{page.value}
						</Pagination.Page>
					{/if}
				{/each}
			</div>
			<Pagination.NextButton
				class="active:scale-98 ml-[29px] inline-flex size-10 items-center justify-center rounded-[9px] bg-transparent hover:bg-muted disabled:cursor-not-allowed disabled:text-muted-foreground hover:disabled:bg-transparent"
			>
				<CaretRight class="size-6" />
			</Pagination.NextButton>
		</div>
		<p class="text-center text-[13px] text-muted-foreground">
			Showing {range.start} - {range.end}
		</p>
	{/snippet}
</Pagination.Root>
