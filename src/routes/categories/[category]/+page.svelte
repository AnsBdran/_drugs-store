<script>
	import { page } from '$app/stores';
	import DrugCard from '$lib/components/drug-card.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	export let data;
	const category = $page.params.category;
</script>

<div class="mb-4 flex items-center justify-between">
	<h1 class="my-0">{category} category</h1>
	<Button variant="ghost" href="/categories/{category}/1">Browse all</Button>
</div>
{#await data.count}
	<p>loading...</p>
{:then count}
	<p>We have a total of {count} products of this category</p>
{/await}

<h2>Top liked products of <span class="text-primary">{category}</span> Catgory.</h2>
{#await data.topProducts}
	<p>loading</p>
{:then topProducts}
	{#each topProducts as product}
		<DrugCard drug={product} />
	{/each}
{/await}
<p>Browse</p>
