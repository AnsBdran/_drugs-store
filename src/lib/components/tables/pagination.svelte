<script lang="ts">
	import * as Pagination from '$lib/components/ui/pagination';
	import { cn } from '$lib/utils';

	let className = '';

	// props
	export let count: number;
	export let perPage: number;
	export let page: number;
	export { className as class };
</script>

<Pagination.Root
	{count}
	{perPage}
	let:pages
	let:currentPage
	bind:page
	class={cn('mx-0', className)}
>
	<Pagination.Content>
		<Pagination.Item>
			<Pagination.PrevButton />
		</Pagination.Item>
		{#each pages as page (page.key)}
			{#if page.type === 'ellipsis'}
				<Pagination.Item>
					<Pagination.Ellipsis />
				</Pagination.Item>
			{:else}
				<Pagination.Item isVisible={currentPage == page.value}>
					<Pagination.Link {page} isActive={currentPage == page.value}>
						{page.value}
					</Pagination.Link>
				</Pagination.Item>
			{/if}
		{/each}
		<Pagination.Item>
			<Pagination.NextButton />
			<!-- <Pagination.NextButton>
				<span class="hidden sm:block">Next</span>
				<ChevronRight class="h-4 w-4" />
			</Pagination.NextButton> -->
		</Pagination.Item>
	</Pagination.Content>
</Pagination.Root>
