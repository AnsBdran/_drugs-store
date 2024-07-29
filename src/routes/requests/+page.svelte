<script>
	import { RequestCard } from '$lib/components';
	import Button from '$lib/components/ui/button/button.svelte';
	export let data;
</script>

<div class="mb-8 flex justify-between">
	<h2>Requests page</h2>
	<Button variant="link" href="/requests/create">Create new</Button>
</div>
<!-- {#await data.requests}
	<p>loading...</p>
{:then requests} -->
<section class="space-y-8">
	{#each data.requests as request}
		<RequestCard
			{request}
			user={data.user}
			isLikedByUser={data.user ? !!request.likedBy.find((v) => v.userID === data.user?.id) : false}
		/>
	{:else}
		<p>No data found.</p>
	{/each}
</section>
<!-- {/await} -->
