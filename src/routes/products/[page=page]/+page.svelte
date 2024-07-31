<script lang="ts">
	import { DrugCard } from '$lib/components';
	import DrugCardSkeleton from '$lib/components/skeletons/drug-card-skeleton.svelte';
	import { Pagination } from '$lib/components';
	import { onMount } from 'svelte';

	export let data;
	$: pageNumber = data.pageSlug;
	$: totalDrugs = data.totalCount;

	$: width = 150;
	$: height = 150;

	const updateDimensions = () => {
		if (window.innerWidth > 900) {
			width = 250;
			height = 350;
		} else {
			width = 150;
			height = 150;
		}
	};

	onMount(() => {
		updateDimensions();
		window.addEventListener('resize', updateDimensions);
		return () => window.removeEventListener('resize', updateDimensions);
	});
</script>

<h1>Page number {pageNumber}</h1>
<div class="flex sm:justify-evenly">
	<Pagination bind:page={pageNumber} count={totalDrugs} perPage={data.pageSize} link="/products" />
</div>

<section
	class=" grid grid-cols-2 place-items-center gap-4 sm:grid-cols-3 sm:gap-8 md:gap-12 900:grid-cols-3 lg:gap-16 xl:grid-cols-4"
>
	{#await data.drugItems}
		{#each new Array(25).fill(0) as _}
			<DrugCardSkeleton class="self-stretch" {width} {height} />
		{/each}
	{:then drugItems}
		{#each drugItems as drug}
			<DrugCard
				{drug}
				user={data.user}
				class="w-[{width}px]"
				{width}
				{height}
				isLikedByUser={data.user ? !!drug.likedBy?.find((d) => d.userID === data.user?.id) : false}
			/>
		{/each}
	{:catch error}
		<p>Error {error.message}</p>
	{/await}
</section>
