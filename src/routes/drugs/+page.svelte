<script lang="ts">
	import { DrugCard } from '$lib/components';
	import Filter from '$lib/components/drugs/filter.svelte';
	import DrugCardSkeleton from '$lib/components/skeletons/drug-card-skeleton.svelte';
	import Pagination from '$lib/components/tables/pagination.svelte';
	// import { drugItems } from '$lib/mock-data';
	import { onMount } from 'svelte';

	export let data;

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

<!-- <section class="mb-4">
	{#await data.categories}
		<p>loading...</p>
	{:then categories}
		<Filter options={categories?.categories.map((c) => c.name)} />
	{/await} 
</section>-->

<!-- <section
	class="medi grid grid-cols-2 place-items-center gap-4 xs:grid-cols-3 sm:grid-cols-4 sm:gap-8 md:gap-12 900:grid-cols-3 lg:grid-cols-4 lg:gap-16 xl:grid-cols-5"
> -->
<!--<Pagination class="bg-green-800" />-->
<section
	class=" grid grid-cols-2 place-items-center gap-4 sm:grid-cols-3 sm:gap-8 md:gap-12 900:grid-cols-3 lg:gap-16 xl:grid-cols-4 xl:grid-cols-5"
>
	{#await data.drugItems}
		{#each new Array(25).fill(0) as drug}
			<DrugCardSkeleton class="self-stretch" {width} {height} />
		{/each}
	{:then drugItems}
		{#each drugItems as drug}
			<DrugCard {drug} class="w-[{width}px]" {width} {height} />
		{/each}
	{:catch}
		<p>Error</p>
	{/await}
</section>
