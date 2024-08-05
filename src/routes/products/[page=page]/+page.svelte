<script lang="ts">
	import { DrugCard } from '$lib/components';
	import DrugCardSkeleton from '$lib/components/skeletons/drug-card-skeleton.svelte';
	import { Pagination } from '$lib/components';
	import { onMount } from 'svelte';
	import { dimensions } from '$lib/stores/dimensions.js';

	export let data;
	$: pageNumber = data.pageSlug;
	$: totalDrugs = data.totalCount;

	onMount(() => {
		const cleanup = dimensions.initialize();
		return cleanup;
	});
</script>

<h1>Page number {pageNumber}</h1>
<div class="flex sm:justify-evenly">
	<Pagination bind:page={pageNumber} count={totalDrugs} perPage={data.pageSize} link="/products" />
</div>

<section class="cards-wrapper">
	{#await data.drugItems}
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
