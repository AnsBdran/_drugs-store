<script>
	import { RequestCard } from '$lib/components';
	import Button from '$lib/components/ui/button/button.svelte';
	export let data;
</script>

<div class="mb-8 flex justify-between">
	<h2>Requests page</h2>
	<Button variant="link" href="/requests/create">Create new</Button>
</div>
{#await data.requests}
	<p>loading...</p>
{:then requests}
	<section class="space-y-8">
		{#each requests as request}
			<RequestCard {request} />
		{:else}
			<p>No data found.</p>
		{/each}
	</section>
{/await}
