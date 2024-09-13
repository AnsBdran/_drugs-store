<script>
	import DrugCard from '$lib/components/drug-card.svelte';
	import Stat from '$lib/components/drugs/stat.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import ClarityFavoriteSolid from '~icons/clarity/favorite-solid';
	export let data;
</script>

<h1>Favorites</h1>

{#await data.count}
	<p>loading...</p>
{:then count}
	<Stat title="Total Favorites" value={count} icon={ClarityFavoriteSolid} class="mb-4" />
{/await}
<Button href="favorites/1">Browse favorites</Button>
