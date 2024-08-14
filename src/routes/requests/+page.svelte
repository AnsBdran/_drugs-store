<script>
	import { RequestCard } from '$lib/components';
	import Button from '$lib/components/ui/button/button.svelte';
	export let data;
</script>

<div class="mb-8 flex justify-between">
	<h2>Latest Requests</h2>
	<Button variant="link" href="/requests/create">Create new</Button>
</div>
{#await data.requests}
	<p>loading...</p>
{:then requests}
	<section class="mb-4 space-y-8">
		{#each requests as request}
			<RequestCard {request} />
		{:else}
			<p>No data found.</p>
		{/each}
	</section>
	<Button href="/requests/1">Browse all</Button>
{/await}
