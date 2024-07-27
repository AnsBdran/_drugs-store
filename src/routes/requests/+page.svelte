<script>
	import { RequestCard } from '$lib/components';
	import Button from '$lib/components/ui/button/button.svelte';
	export let data;
</script>

<h2>Requests page</h2>
{#await data.requests}
	<p>loading...</p>
{:then requests}
	{#each requests as request}
		<RequestCard {request} />
	{/each}
{/await}

<Button variant="link" href="/requests/create">Create new</Button>
