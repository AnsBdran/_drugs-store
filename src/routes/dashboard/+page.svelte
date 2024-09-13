<script>
	import Stat from '$lib/components/drugs/stat.svelte';
	import StatSekeleton from '$lib/components/skeletons/stat-sekeleton.svelte';
	import MaterialSymbolsShoppingBagOutline from '~icons/material-symbols/shopping-bag-outline';
	export let data;
</script>

<h1>
	Hello, {data.username}
</h1>

<section class="requests-wrapper md:grid-cols-2">
	{#await data.usersCount}
		<StatSekeleton />
	{:then usersCount}
		<Stat
			icon={MaterialSymbolsShoppingBagOutline}
			value={usersCount}
			title="Our registered users count"
		/>
	{/await}

	{#await data.brandsCount}
		<StatSekeleton />
	{:then brandsCount}
		<Stat
			icon={MaterialSymbolsShoppingBagOutline}
			value={brandsCount}
			title="Brands we have a products from"
		/>
	{/await}

	{#await data.likedProducts}
		<StatSekeleton />
	{:then likedProducts}
		<Stat
			icon={MaterialSymbolsShoppingBagOutline}
			value={likedProducts}
			title="Likes users had submit to our products"
		/>
	{/await}

	{#await data.likedRequests}
		<StatSekeleton />
	{:then likedRequests}
		<Stat
			icon={MaterialSymbolsShoppingBagOutline}
			value={likedRequests}
			title="Likes on users requests"
		/>
	{/await}
</section>
