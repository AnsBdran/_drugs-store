<script lang="ts">
	export let data;
	import { Stat } from '$lib/components/drugs';
	import BxHealth from '~icons/bx/health';
	import AntDesignProductFilled from '~icons/ant-design/product-filled';
	import StatSekeleton from '$lib/components/skeletons/stat-sekeleton.svelte';
	import { ScrollingText } from '$lib/components';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<ScrollingText>
	<Badge variant="destructive">Accurate prescription</Badge>
	<Badge variant="secondary">Fast delivery</Badge>
	<Badge variant="default">Competent prices</Badge>

	<!-- <h3>Accurate prescription, fast delivery, High prices</h3> -->
	<!-- <h3>Accurate prescription, fast delivery, High prices</h3> -->
</ScrollingText>
<section class="cards-wrapper flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
	<!--<section class="flex flex-col justify-between items-stretch gap-8 sm:flex-row sm:items-stretch cards-wrapper">z-->
	{#await data.totalBrands}
		<StatSekeleton />
	{:then totalBrands}
		<Stat icon={BxHealth} title="Total Brands" value={totalBrands} />
		<!-- description="We have over than {totalBrands} different drug producers." -->
		<!-- description="Continuously increasing and working on adding more prodcuts." -->
	{:catch error}
		<p class="border border-muted bg-destructive/40 px-3 py-2 text-destructive-foreground">
			You have a bad internet connection
		</p>
	{/await}
	{#await data.totalDrugs}
		<StatSekeleton />
	{:then totalDrugs}
		<Stat icon={AntDesignProductFilled} title="Total Products" value={totalDrugs} />
	{:catch}
		<p class="border border-muted bg-destructive/40 px-3 py-2 text-destructive-foreground">
			You have a bad internet connection
		</p>
	{/await}
</section>
<Button href="/products/1" class="mt-8">View all drugs</Button>

<!-- <Stat icon={BxHealth} title="Total Brands" value={2} /> -->

<style>
	:global(.cards-wrapper > *) {
		flex: 1;
		min-width: 300px;
	}
</style>
