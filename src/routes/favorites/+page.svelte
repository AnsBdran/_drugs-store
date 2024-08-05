<script>
	import DrugCard from '$lib/components/drug-card.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	export let data;
</script>

<h1>Favorites</h1>

{#await data.count}
	<p>loading...</p>
{:then count}
	<p>total: {count}</p>
{/await}
<Button href="favorites/1">Browser favorites</Button>
