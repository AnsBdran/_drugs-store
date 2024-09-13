<script lang="ts">
	import { DrugCard, Filters } from '$lib/components';
	import DrugCardSkeleton from '$lib/components/skeletons/drug-card-skeleton.svelte';
	import { Pagination } from '$lib/components';
	import { onMount } from 'svelte';
	import { dimensions } from '$lib/stores/dimensions';
	import { ITEMS_PER_PAGE } from '$lib/constants';
	export let data;

	$: pageNumber = data.pageSlug;

	const { store } = dimensions;
	onMount(() => {
		const cleanup = dimensions.initialize();
		return cleanup;
	});
</script>

<h1>
	{#await data._data}
		Page number {pageNumber}
	{:then _data}
		{#if _data.searchTerm}
			search results for <span class="bg-accent px-2 text-accent-foreground"
				>{_data.searchTerm}</span
			>
			<p class="mt-0 text-sm tracking-wider text-muted-foreground">Found {_data.count} matches</p>
		{:else}
			Page number {pageNumber}
		{/if}
	{/await}
</h1>
<Filters />

<section class="">
	{#await data._data}
		<div class="cards-wrapper">
			{#each new Array(ITEMS_PER_PAGE).fill(0) as _}
				<DrugCardSkeleton width={$store.width} height={$store.height} />
			{/each}
		</div>
	{:then _data}
		<div class="cards-wrapper">
			{#each _data.data as drug}
				<DrugCard width={$store.width} height={$store.height} {drug} />
			{/each}
		</div>
		{#if _data.count > ITEMS_PER_PAGE}
			<div class="flex">
				<Pagination bind:page={pageNumber} count={_data.count} />
			</div>
		{/if}
	{:catch error}
		<p>Error {error.message}</p>
	{/await}
</section>

<!-- Alert message if there no products -->
<!-- {#await data.drugItems}
	''
{:then data}
	{#if !data.length}
		<Alert title="No products found"
			>No products were found for the filtering rules you have set</Alert
		>
	{/if}
{/await} -->
