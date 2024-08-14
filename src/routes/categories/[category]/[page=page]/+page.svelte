<script>
	import { DrugCard, Filters } from '$lib/components';
	import Pagination from '$lib/components/pagination.svelte';
	import DrugCardSkeleton from '$lib/components/skeletons/drug-card-skeleton.svelte';
	import { dimensions } from '$lib/stores/dimensions';
	import { onMount } from 'svelte';

	export let data;
	$: pageNumber = data.pageNumber;
	$: totalDrugs = data.count;

	onMount(() => {
		const cleanup = dimensions.initialize();
		return cleanup;
	});
</script>

<h1>
	{#if data.searchTerm}
		Showing search results for
		<!-- <span class="highlighted">
			{data.searchTerm}
		</span> -->
	{:else}
		<span class="text-primary"> {data.category}</span> Category page
	{/if}
</h1>
<Pagination bind:page={pageNumber} count={totalDrugs} />
<Filters />
<section class="cards-wrapper">
	{#await data.products}
		{#each new Array(10).fill(0) as _}
			<DrugCardSkeleton class="self-stretch" />
		{/each}
	{:then drugItems}
		{#each drugItems as drug}
			<DrugCard {drug} />
		{/each}
	{:catch error}
		<p>Error {error.message}</p>
	{/await}
</section>
