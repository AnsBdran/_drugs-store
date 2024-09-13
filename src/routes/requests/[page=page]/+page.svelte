<script>
	import { RequestCard } from '$lib/components';
	import Pagination from '$lib/components/pagination.svelte';
	import RequestCardSkeleton from '$lib/components/skeletons/request-card-skeleton.svelte';
	import { Button } from '$lib/components/ui/button';
	import { ITEMS_PER_PAGE } from '$lib/constants';
	export let data;
</script>

<h1>Requests page</h1>

<!-- <section class="requests-wrapper">
	{#each Array(ITEMS_PER_PAGE) as _, i (i)}
		<RequestCardSkeleton />
		{/each}
		</section> -->
{#await data.promise}
	<section class="requests-wrapper">
		{#each Array(ITEMS_PER_PAGE) as _, i (i)}
			<RequestCardSkeleton />
		{/each}
	</section>
{:then data_}
	<section class="requests-wrapper">
		{#each data_[0] as request}
			<RequestCard {request} />
		{:else}
			<p>No data found.</p>
		{/each}
	</section>
	<Pagination count={data_[1]} page={data.page} class="mt-8" />
{/await}
