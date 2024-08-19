<script lang="ts">
	import * as Drawer from '$lib/components/ui/drawer';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	// icons
	import MaterialSymbolsFilterAltOutlineSharp from '~icons/material-symbols/filter-alt-outline-sharp';
	import { Filters, Search } from './internal';
	import ScrollArea from './ui/scroll-area/scroll-area.svelte';

	const clear = () => {
		goto($page.url.pathname);
	};
</script>

<section class="z-50 flex justify-between py-8 md:hidden">
	<Search class="w-full px-4" />
	<div class="">
		<Drawer.Root>
			<Drawer.Trigger asChild let:builder
				><Button variant="outline" builders={[builder]} class="gap-3">
					Filters
					<MaterialSymbolsFilterAltOutlineSharp /></Button
				></Drawer.Trigger
			>
			<Drawer.Content>
				<Drawer.Header>
					<Drawer.Title>Filter and sort Products</Drawer.Title>
					<Drawer.Description>Choose the filters and sort to apply</Drawer.Description>
				</Drawer.Header>
				<Filters />
				<Drawer.Footer class="mt-8 flex-row gap-3 [&>*]:flex-1">
					<Button variant="destructive" on:click={clear}>Clear all filters</Button>
					<Drawer.Close>Close</Drawer.Close>
				</Drawer.Footer>
			</Drawer.Content>
		</Drawer.Root>
	</div>
</section>

<section class="sidebar fixed inset-0 top-header hidden w-sidebar md:block">
	<div class="flex h-full flex-col justify-between gap-4 px-3 py-3 pb-8">
		<Search class="w-full" />
		<ScrollArea class="h-4/5 flex-1">
			<Filters
				class="w-full px-0 pr-2"
				toggleGroupClass="flex-col gap-3 items-stretch [&>*]:py-2 border-b pb-6"
			/>
		</ScrollArea>
		<Button variant="destructive" on:click={clear}>Clear all filters</Button>
	</div>
</section>
