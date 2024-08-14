<script>
	import { RequestCard } from '$lib/components';
	import Pagination from '$lib/components/pagination.svelte';
	import { Button } from '$lib/components/ui/button';
	import { ITEMS_PER_PAGE } from '$lib/constants';
	export let data;
</script>

<h1>Requests page</h1>

{#await data.promise}
	{#each Array(ITEMS_PER_PAGE) as _, i (i)}
		<p>i</p>
	{/each}
{:then data_}
	<section class="mb-4 space-y-8">
		{#each data_[0] as request}
			<RequestCard {request} />
		{:else}
			<p>No data found.</p>
		{/each}
	</section>
	<Pagination count={data_[1]} page={data.page} />
{/await}
