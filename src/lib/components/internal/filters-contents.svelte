<script lang="ts">
	import * as ToggleGroup from '$lib/components/ui/toggle-group';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { URL_PAGE_NUMBER_REGEX } from '$lib/constants.js';
	// icons
	import MaterialSymbolsArrowRangeRounded from '~icons/material-symbols/arrow-range-rounded';
	import MdiInfinity from '~icons/mdi/infinity';
	import IcBaselineFavorite from '~icons/ic/baseline-favorite';
	import CarbonRecentlyViewed from '~icons/carbon/recently-viewed';
	import TypcnSortAlphabetically from '~icons/typcn/sort-alphabetically';
	import FluentTextSortDescending20Filled from '~icons/fluent/text-sort-descending-20-filled';
	import FluentTextSortAscending20Filled from '~icons/fluent/text-sort-ascending-20-filled';
	import { cn } from '$lib/utils';

	$: order = $page.url.searchParams.get('order') ?? 'asc';
	$: sortBy = $page.url.searchParams.get('sortBy') ?? 'recent';
	$: price = $page.url.searchParams.get('price') ?? undefined;

	let className = '';

	export { className as class };
	// export let orientation: 'vertical' | 'horizontal' = 'horizontal';
	export let toggleGroupClass = '';
	const handleSortChange = (value: string | undefined) => {
		const newUrl = new URL($page.url);
		if (!value || value === 'recent') {
			newUrl.searchParams.delete('sortBy');
		} else {
			newUrl.pathname = newUrl.pathname.replace(URL_PAGE_NUMBER_REGEX, '/1');
			newUrl.searchParams.set('sortBy', value);
		}
		goto(newUrl.toString());
	};

	const handlePriceChange = (value: string | undefined) => {
		const newUrl = new URL($page.url);
		if (!value) {
			newUrl.searchParams.delete('price');
		} else {
			newUrl.pathname = newUrl.pathname.replace(URL_PAGE_NUMBER_REGEX, '/1');
			newUrl.searchParams.set('price', value);
		}
		goto(newUrl.toString());
	};

	const handleOrderChange = (value: string | undefined) => {
		const newUrl = new URL($page.url);
		if (!value) {
			newUrl.searchParams.delete('order');
		} else {
			newUrl.pathname = newUrl.pathname.replace(URL_PAGE_NUMBER_REGEX, '/1');
			newUrl.searchParams.set('order', value);
		}
		goto(newUrl.toString());
	};

	const clear = () => {
		goto($page.url.pathname);
	};
</script>

<section class={cn('filters space-y-8 px-4', className)}>
	<div>
		<h5 class="mb-1">Filter by Price</h5>
		<ToggleGroup.Root
			bind:value={price}
			class={cn('toggle-group', toggleGroupClass)}
			type="single"
			onValueChange={handlePriceChange}
		>
			<ToggleGroup.Item value="low">1<MaterialSymbolsArrowRangeRounded />10</ToggleGroup.Item>
			<ToggleGroup.Item value="mid">10 <MaterialSymbolsArrowRangeRounded /> 30</ToggleGroup.Item>
			<ToggleGroup.Item value="high"
				>30 <MaterialSymbolsArrowRangeRounded /> <MdiInfinity />
			</ToggleGroup.Item>
			<!-- <ToggleGroup.Item value="" hidden aria-hidden class=""></ToggleGroup.Item> -->
		</ToggleGroup.Root>
	</div>

	<div>
		<h5>Sort By</h5>
		<ToggleGroup.Root
			type="single"
			bind:value={sortBy}
			class={cn('toggle-group', toggleGroupClass)}
			onValueChange={handleSortChange}
			orientation="horizontal"
			hidden
		>
			<ToggleGroup.Item value="favorites">Top favorited <IcBaselineFavorite /></ToggleGroup.Item>
			<ToggleGroup.Item value="recent">Most Recent <CarbonRecentlyViewed /></ToggleGroup.Item>
			<ToggleGroup.Item value="alphabetical"
				>Alphabetical <TypcnSortAlphabetically /></ToggleGroup.Item
			>
		</ToggleGroup.Root>
	</div>
	<div>
		<h5>Order</h5>
		<ToggleGroup.Root
			class={cn('toggle-group', toggleGroupClass)}
			type="single"
			onValueChange={handleOrderChange}
			bind:value={order}
			orientation="horizontal"
		>
			<ToggleGroup.Item value="asc">
				Ascending <FluentTextSortAscending20Filled />
			</ToggleGroup.Item>
			<ToggleGroup.Item value="desc">
				Descending <FluentTextSortDescending20Filled />
			</ToggleGroup.Item>
		</ToggleGroup.Root>
	</div>
</section>

<!-- link="/products" -->

<style>
	:global(.price-filter > *) {
		@apply gap-1;
	}

	:global(.filters h5) {
		@apply mb-4;
	}

	:global(.filters div) {
		background-color: var(--primary);
	}
	:global(.toggle-group > *) {
		@apply flex-1 gap-2;
	}
</style>
