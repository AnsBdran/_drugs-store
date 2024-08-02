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

<h1>Category page</h1>
<Pagination
	bind:page={pageNumber}
	count={totalDrugs}
	perPage={data.pageSize}
	link="/categories/{data.category}"
/>
<section
	class=" grid flex-wrap place-items-center gap-4 xs:grid-cols-2 sm:grid-cols-3 sm:gap-8 md:gap-12 900:grid-cols-3 lg:gap-16 xl:grid-cols-4"
>
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
