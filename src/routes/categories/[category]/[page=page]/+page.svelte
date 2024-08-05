<script>
	import { DrugCard } from '$lib/components';
	import Pagination from '$lib/components/pagination.svelte';
	import DrugCardSkeleton from '$lib/components/skeletons/drug-card-skeleton.svelte';
	import { dimensions } from '$lib/stores/dimensions';
	import { onMount } from 'svelte';

	export let data;
	$: pageNumber = data.pageNumber;
	$: totalDrugs = data.totalCount;

	onMount(() => {
		const cleanup = dimensions.initialize();
		return cleanup;
	});
</script>

<h1><span class="text-primary"> {data.category}</span> Category page</h1>
<Pagination
	bind:page={pageNumber}
	count={totalDrugs}
	perPage={data.pageSize}
	link="/categories/{data.category}"
/>
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
