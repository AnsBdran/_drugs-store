<script lang="ts">
	import { cn } from '$lib/utils';
	import LikeBtn from './like-btn.svelte';
	import { dimensions } from '$lib/stores/dimensions';
	import { page } from '$app/stores';
	import type { User } from 'lucia';
	import { Badge } from './ui/badge';
	import Button from './ui/button/button.svelte';
	let className: string | undefined | null = undefined;
	// icons
	import MaterialSymbolsAddShoppingCartOutlineRounded from '~icons/material-symbols/add-shopping-cart-outline-rounded';
	import TablerCurrencyShekel from '~icons/tabler/currency-shekel';
	import HugeiconsImageNotFound01 from '~icons/hugeicons/image-not-found-01';
	import { toast } from 'svelte-sonner';
	import { cart } from '$lib/stores/cart';
	import { CldImage } from 'svelte-cloudinary';
	import type { DrugItem } from '$lib/types';

	export let drug: DrugItem;
	const { store } = dimensions;
	$: width = $store.width;
	$: height = $store.height;

	export { className as class };

	const user: User | null = $page.data.user;
	$: isLikedByUser = user ? !!drug.likedBy.find((d) => d.userID === user.id) : false;

	const addToCart = () => {
		console.log('adding to cart');
		if (!!$cart.find((d) => d.data.id === drug.id)) {
			return toast(`${drug.drug.brandName} is already in your cart`);
		}
		cart.update((prev) => {
			const newCart = [...prev, { data: drug, count: 1 }];
			window.localStorage.setItem('cart', JSON.stringify(newCart));
			return newCart;
		});
		toast(`${drug.drug.brandName} added to cart successfully.`);
	};
</script>

<div class={cn('group block overflow-hidden', className)} style={`width: ${width}px;`}>
	<div
		style="width: {width}px; height: {height}px"
		class="relative overflow-hidden border-2 border-transparent hover:border-primary/40"
	>
		<a href="/product/{drug.id}">
			{#if drug.images.find((i) => i.isPrimary)}
				<!-- <CldImage
					src={drug.images[0].publicID}
					alt="pharmacist"
					class="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
					width={drug.images[0].width}
					height={drug.images[0].height}
					/> -->
				<img
					src={drug.images.find((i) => i.isPrimary)?.url}
					alt={drug.drug.brandName}
					class="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
				/>
			{:else}
				<div class="flex h-full w-full items-center justify-center bg-background">
					<!-- <span> NO Image </span> -->
					<HugeiconsImageNotFound01 class="size-full" />
				</div>
			{/if}
		</a>
		<Button
			class="absolute bottom-1 right-1 size-6 bg-gray-800 p-0 text-background opacity-80 group-hover:opacity-95 dark:text-foreground 900:size-9"
			variant="ghost"
			on:click={addToCart}
		>
			<MaterialSymbolsAddShoppingCartOutlineRounded class="900:size-6" />
		</Button>
	</div>

	<div class="relative pt-3">
		<div class="flex items-start justify-between">
			<h3
				class="mb-0 line-clamp-1 text-sm text-primary/70 hover:line-clamp-3 group-hover:underline group-hover:underline-offset-4 sm:text-base md:text-lg"
			>
				<a href="/product/{drug.id}">
					{drug.drug.brandName}
				</a>
			</h3>
			<LikeBtn {user} {isLikedByUser} likes={drug.likes} id={drug.id} on:dislike />
		</div>

		<div class="mt-1.5 flex items-center justify-between gap-2">
			<p class="flex items-center tracking-wide"><TablerCurrencyShekel />{drug.price.item}</p>
			<Badge
				variant="secondary"
				class="!mt-0 overflow-hidden text-clip text-nowrap px-1 text-[10px] uppercase tracking-wide 900:text-xs"
				>{drug.form}</Badge
			>
			<!-- <p class="!mt-0 text-xs uppercase tracking-wide">{drug.form}</p> -->
		</div>
	</div>
</div>
