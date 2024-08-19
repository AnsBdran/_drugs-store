<script lang="ts">
	import * as Pagination from '$lib/components/ui/pagination';
	import { cn } from '$lib/utils';
	import MaterialSymbolsArrowLeftAltRounded from '~icons/material-symbols/arrow-left-alt-rounded';
	import MaterialSymbolsArrowRightAltRounded from '~icons/material-symbols/arrow-right-alt-rounded';
	import Button from './ui/button/button.svelte';
	import { page as _page } from '$app/stores';
	import { ITEMS_PER_PAGE } from '$lib/constants';

	let className = '';
	// props
	export let count: number;
	// export let perPage: number;
	let perPage = ITEMS_PER_PAGE;
	export let page: number;
	// export let link: string;
	$: createLink = (slug: string) =>
		`${$_page.url.pathname.replace(/\/\d+(\?.*)?$/, '')}/${slug}${$_page.url.searchParams ? '?' + $_page.url.searchParams.toString() : ''}`;

	export { className as class };

	$: showPrev = Number(page) > 1;
	$: showNext = Number(page) < count / perPage;
</script>

<Pagination.Root
	{count}
	{perPage}
	let:pages
	let:currentPage
	bind:page
	class={cn('mx-0 mb-6 w-max', className)}
>
	<Pagination.Content>
		<Pagination.Item>
			<Button
				size="icon"
				disabled={!showPrev}
				variant="secondary"
				href={showPrev ? createLink(Number(page) - 1) : undefined}
			>
				<MaterialSymbolsArrowLeftAltRounded />
			</Button>
		</Pagination.Item>
		{#each pages as page (page.key)}
			{#if page.type === 'ellipsis'}
				<Pagination.Item>
					<Pagination.Ellipsis />
				</Pagination.Item>
			{:else}
				<Button
					href={currentPage === page.value ? undefined : createLink(page.value)}
					variant="ghost"
					size="icon"
					class={cn({
						'bg-muted opacity-50': currentPage === page.value
					})}>{page.value}</Button
				>
				<!-- <Pagination.Item>
					<a href={`${link}/${page.value}`}>
						<Pagination.Link {page} isActive={currentPage === page.value} variant="destructive">
							{page.value}
						</Pagination.Link>
					</a>
				</Pagination.Item> -->
			{/if}
		{/each}
		<Button
			size="icon"
			variant="secondary"
			disabled={!showNext}
			href={showNext ? createLink(page + 1) : undefined}
		>
			<MaterialSymbolsArrowRightAltRounded /></Button
		>
	</Pagination.Content>
</Pagination.Root>
