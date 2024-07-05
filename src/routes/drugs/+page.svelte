<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	export let data;
	onMount(() => {
		page.subscribe(($page) => {
			console.log($page.data);
		});
	});
</script>

<h1>Hello, drugs</h1>
{#await data.drugs}
	<p>loading...</p>
{:then drugs}
	{#each drugs as drug}
		<p>{drug.name.brand}</p>
	{/each}
{/await}
