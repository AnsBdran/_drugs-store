<script lang="ts">
	import { dimensions } from '$lib/stores/dimensions';
	import type { DrugItem } from '@prisma/client';
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
	export let item: { data: DrugItem; count: number };
	onMount(() => {
		const cleanup = initialize();
		return cleanup;
	});

	const increment = () => {
		console.log('incrementing');
		cart.update((prev) => {
			const updated = prev.map((i) =>
				i.data.id === item.data.id ? { ...i, count: ++i.count } : i
			);
			console.log('updated values', updated);
			window.localStorage.setItem('cart', JSON.stringify(updated));
			return updated;
		});
	};

	const decrement = () => {
		cart.update((prev) => {
			const updated = prev.map((i) =>
				i.data.id === item.data.id ? { ...i, count: i.count <= 0 ? i.count : --i.count } : i
			);
			console.log('updated values', updated);
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
		<CldImage
			src={item.data.image.public_id}
			alt={item.data.drug.brandName}
			class="h-full w-full object-cover"
			width={150}
			height={150}
		/>
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
			<span class="flex min-w-8 items-center justify-center">{item.count}</span>
			<Separator orientation="vertical" />
			<Button variant="ghost" size="icon" class="rounded-none" on:click={increment}>
				<IonBagAdd />
			</Button>
		</div>
	</div>
</div>
