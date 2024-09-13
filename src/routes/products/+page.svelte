<script lang="ts">
	export let data;
	import { Stat } from '$lib/components/drugs';
	import BxHealth from '~icons/bx/health';
	import AntDesignProductFilled from '~icons/ant-design/product-filled';
	import StatSekeleton from '$lib/components/skeletons/stat-sekeleton.svelte';
	import { ScrollingText } from '$lib/components';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Alert from '$lib/components/alert.svelte';
	import MaterialSymbolsCategoryOutline from '~icons/material-symbols/category-outline';
	import IconParkOutlineAdProduct from '~icons/icon-park-outline/ad-product';
	let error: string | null = null;
	const handleLoadError = () => {
		error = 'Error while loading the data, try refreshing the page.';
	};
	import image from '$lib/images/pharmacist.jpeg';
</script>

<div class="mb-8 flex space-x-16 overflow-hidden">
	<div class="flex animate-loop-scroll space-x-16">
		<img width="200" height="200" src={image} alt="lorem" class="max-w-none" />
		<img width="200" height="200" src={image} alt="lorem" class="max-w-none" />
		<img width="200" height="200" src={image} alt="lorem" class="max-w-none" />
	</div>
	<div class="flex animate-loop-scroll space-x-16">
		<img width="200" height="200" src={image} alt="lorem" class="max-w-none" />
		<img width="200" height="200" src={image} alt="lorem" class="max-w-none" />
		<img width="200" height="200" src={image} alt="lorem" class="max-w-none" />
	</div>
</div>
<!-- <ScrollingText> -->
<!-- <Badge class="!max-w-none" variant="destructive">Accurate prescription</Badge> -->
<!-- <Badge class="!max-w-none" variant="secondary">Fast delivery</Badge> -->
<!-- <Badge class="!max-w-none" variant="default">Competent prices</Badge> -->
<!-- <img src={image} alt="lorem" class="max-w-none" width="150" height="150" /> -->
<!-- <h3>Accurate prescription, fast delivery, High prices</h3> -->
<!-- <h3>Accurate prescription, fast delivery, High prices</h3> -->
<!-- </ScrollingText> -->
<section class="stats-wrapper flex flex-col gap-4 sm:flex-row sm:flex-wrap">
	<!--<section class="flex flex-col justify-between items-stretch gap-8 sm:flex-row sm:items-stretch cards-wrapper">z-->
	{#await data.totalBrands}
		<StatSekeleton />
	{:then totalBrands}
		<Stat icon={BxHealth} title="Total Brands" value={totalBrands} />
	{:catch error}
		{#if !error}
			{handleLoadError()}
		{/if}
	{/await}
	{#await data.totalDrugs}
		<StatSekeleton />
	{:then totalDrugs}
		<Stat icon={IconParkOutlineAdProduct} title="Total Products" value={totalDrugs} />
	{:catch}
		{#if !error}
			{handleLoadError()}
		{/if}
	{/await}
	{#await data.totalCategories}
		<StatSekeleton />
	{:then totalCategories}
		<Stat title="Total Categories" value={totalCategories} icon={MaterialSymbolsCategoryOutline} />
	{/await}
</section>
{#if error}
	<Alert showRefresh type="error" title="Bad Internet connection">{error}</Alert>
{/if}
<Button href="/products/1" class="mt-8">View all drugs</Button>

<!-- <Stat icon={BxHealth} title="Total Brands" value={2} /> -->

<style>
	:global(.stats-wrapper > *) {
		flex: 1;
		min-width: 300px;
	}
</style>
