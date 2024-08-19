<script>
	export let data;

	import DrugCard from '$lib/components/drug-card.svelte';
	import Pagination from '$lib/components/pagination.svelte';
	import DrugCardSkeleton from '$lib/components/skeletons/drug-card-skeleton.svelte';

	const handleDislike = (event) => {
		data.favorites = data.favorites?.filter((item) => item.id !== event.detail.id);
	};
</script>

{#if data.count >= 1 && data.favorites?.length}
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
{:else}
	<h2>You don't have any favorites</h2>
{/if}
