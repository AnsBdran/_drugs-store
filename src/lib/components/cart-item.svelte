<script lang="ts">
	import { dimensions } from '$lib/stores/dimensions';
	import { onMount } from 'svelte';
	import { CldImage } from 'svelte-cloudinary';
	import TablerCurrencyShekel from '~icons/tabler/currency-shekel';
	const { initialize, store } = dimensions;
	$: width = $store.width;
	$: height = $store.height;
	import IonBagAdd from '~icons/ion/bag-add';
	import IonBagRemove from '~icons/ion/bag-remove';
	import Separator from './ui/separator/separator.svelte';
	import HugeiconsDelete02 from '~icons/hugeicons/delete-02';
	import { Button } from './ui/button';
	import { cart } from '$lib/stores/cart';
	import Badge from './ui/badge/badge.svelte';
	import FluentEmojiHighContrastMultiply from '~icons/fluent-emoji-high-contrast/multiply';
	import StreamlineEqualSignSolid from '~icons/streamline/equal-sign-solid';
	import type { DrugItem } from '$lib/types';
	import * as Popover from '$lib/components/ui/popover';
	import Input from './ui/input/input.svelte';
	export let item: { data: DrugItem; count: number };
	onMount(() => {
		const cleanup = initialize();
		return cleanup;
	});

	const increment = () => {
		cart.update((prev) => {
			const updated = prev.map((i) =>
				i.data.id === item.data.id ? { ...i, count: ++i.count } : i
			);
			window.localStorage.setItem('cart', JSON.stringify(updated));
			return updated;
		});
	};

	const decrement = () => {
		cart.update((prev) => {
			const updated = prev.map((i) =>
				i.data.id === item.data.id ? { ...i, count: i.count <= 0 ? i.count : --i.count } : i
			);
			window.localStorage.setItem('cart', JSON.stringify(updated));
			return updated;
		});
	};

	const remove = () => {
		cart.update((prev) => {
			const updated = prev.filter((i) => i.data.id !== item.data.id);
			localStorage.setItem('cart', JSON.stringify(updated));
			return updated;
		});
	};
</script>

<div class="flex gap-4" style="height: {150}px;">
	<div class=" " style="width: {150}px; height: {150}px">
		{#if !!item.data.images.find((i) => i.isPrimary)}
			<CldImage
				src={item.data.images.find((i) => i.isPrimary)?.publicID}
				alt={item.data.drug.brandName}
				class="h-full w-full object-cover"
				width={150}
				height={150}
			/>
		{:else}
			<div class="flex h-full w-full items-center justify-center border-2 bg-background">
				<span>No Image</span>
			</div>
		{/if}
	</div>
	<div class="flex flex-1 flex-col items-start gap-2">
		<div class="flex justify-between gap-8 self-stretch">
			<h3 class="!mb-0 text-opacity-40">{item.data.drug.brandName}</h3>
			<Button size="icon" variant="destructive" class="size-7 bg-destructive/60" on:click={remove}>
				<HugeiconsDelete02 />
			</Button>
		</div>
		<p class="!m-0 flex items-center font-mono text-xl">
			<TablerCurrencyShekel />
			{item.data.price.item}
		</p>
		<Badge variant="secondary" class="flex gap-2">
			{item.data.price.item}
			<FluentEmojiHighContrastMultiply class="size-2" />
			{item.count}
			<StreamlineEqualSignSolid class="size-2" />
			<span class="text-primary">
				{item.data.price.item * item.count}
			</span>
		</Badge>
		<div class="mt-auto flex justify-between rounded border">
			<Button
				disabled={item.count <= 1}
				variant="ghost"
				size="icon"
				class="rounded-none"
				on:click={decrement}
			>
				<IonBagRemove />
			</Button>
			<Separator orientation="vertical" />
			<Popover.Root>
				<Popover.Trigger>
					<span class="flex min-w-8 items-center justify-center">{item.count}</span>
				</Popover.Trigger>
				<Popover.Content>
					<Input bind:value={item.count} type="number" />
				</Popover.Content>
			</Popover.Root>
			<Separator orientation="vertical" />
			<Button variant="ghost" size="icon" class="rounded-none" on:click={increment}>
				<IonBagAdd />
			</Button>
		</div>
	</div>
</div>
