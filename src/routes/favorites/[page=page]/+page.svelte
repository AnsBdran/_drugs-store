<script>
	export let data;

	import DrugCard from '$lib/components/drug-card.svelte';
	import Pagination from '$lib/components/pagination.svelte';
	import DrugCardSkeleton from '$lib/components/skeletons/drug-card-skeleton.svelte';

	console.log('data', data);
	const handleDislike = (event) => {
		data.favorites = data.favorites?.filter((item) => item.id !== event.detail.id);
		console.log('hi you', event.detail.id);
	};
</script>

<h1>Browser all favorites</h1>
<Pagination count={data.count} link="/favorites" page={data.page} perPage={data.limit} />
<section class="cards-wrapper">
	{#await data.favorites}
		<DrugCardSkeleton />
	{:then favorites}
		{#each favorites as favorite}
			<DrugCard on:dislike={handleDislike} drug={favorite} />
		{/each}
	{/await}
</section>
