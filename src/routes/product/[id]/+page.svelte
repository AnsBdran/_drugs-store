<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	// import AutoPlay from 'embla-au';
	import { CldImage } from 'svelte-cloudinary';
	import IcRoundFavoriteBorder from '~icons/ic/round-favorite-border';
	import IcTwotoneFavorite from '~icons/ic/twotone-favorite';
	import { cn } from '$lib/utils';
	import LikeBtn from '$lib/components/like-btn.svelte';
	import Loading from '$lib/components/loading.svelte';
	import * as Popover from '$lib/components/ui/popover';
	import TablerCurrencyShekel from '~icons/tabler/currency-shekel';
	import * as Carousel from '$lib/components/ui/carousel';
	import * as Accordion from '$lib/components/ui/accordion';

	import PhCaretUpDownBold from '~icons/ph/caret-up-down-bold';
	import type { PageData } from './$types.js';

	export let data: PageData;
	// const { product, user } = data;

	$: isLikedByUser = data.user
		? !!data.product?.likedBy.find((p) => p.userID === data.user?.id)
		: false;
	console.log('product recieved', data.product.likes);
</script>

<section class="bg-white py-8 antialiased dark:bg-background md:py-16">
	<div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
		<div class="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
			<!-- <CldImage src={product?.image.public_id} alt={product?.drug.brandName} /> -->
			<div class="mx-auto max-w-md shrink-0 px-3 lg:max-w-lg">
				<Carousel.Root class="w-full">
					<Carousel.Content class="">
						{#each data.product.images as image, i (i)}
							<Carousel.Item class="pl-1 md:basis-1/2 lg:basis-1/3">
								<div class="p-1">
									<img src={image.url} alt={data.product?.drug.brandName} />
								</div>
							</Carousel.Item>
						{/each}
					</Carousel.Content>
					<Carousel.Previous />
					<Carousel.Next />
				</Carousel.Root>
			</div>

			<div class="mt-6 sm:mt-8 lg:mt-0">
				<div class="flex items-start justify-between">
					<h1 class="sm:text-6x mb-0 text-4xl font-semibold text-primary">
						{data.product?.drug.brandName}
					</h1>
				</div>
				<div class="mt-4 flex justify-between sm:items-center sm:gap-4">
					<p
						class="flex items-center text-3xl font-normal text-gray-900 dark:text-white sm:text-3xl"
					>
						<TablerCurrencyShekel />
						{data.product?.price.item}
					</p>
					<Popover.Root>
						<Popover.Trigger asChild let:builder>
							<Button builders={[builder]} variant="ghost" class="gap-3 "
								>Drug Active Ingredients
								<PhCaretUpDownBold />
							</Button>
						</Popover.Trigger>

						<Popover.Content class="space-y-2">
							{#each data.product?.activeIngredients as ai}
								<p class="flex justify-between gap-2 rounded border px-2 py-1">
									{ai.name}<Badge variant="secondary">
										{ai.strength.amount}
										{#if ai.strength.per !== 'unit'}
											/{ai.strength.per}
										{/if}
									</Badge>
								</p>
							{/each}
						</Popover.Content>
					</Popover.Root>
				</div>
				<LikeBtn
					user={data.user}
					{isLikedByUser}
					id={data.product?.id}
					likes={data.product?.likes}
					let:likeFn
					let:isLoading
					let:isHighlighted
					let:num
				>
					<div class="mt-6 flex items-center gap-4">
						<Button
							type="submit"
							variant="secondary"
							class="flex min-w-52 items-center gap-2"
							on:click={likeFn}
						>
							{#if isLoading}
								<Loading class="bg-primary" />
							{:else if isHighlighted}
								<IcTwotoneFavorite class="text-primary" />Remove from favorites
							{:else}
								<IcRoundFavoriteBorder />
								Add to favorites
							{/if}
						</Button>
						<Badge
							class={cn('flex h-full items-center gap-1 bg-opacity-70', {
								'bg-opacity-100': isHighlighted
							})}
						>
							<IcTwotoneFavorite />
							{num}
						</Badge>
						<!-- {JSON.stringify({ num, isLoading, isHighlighted }, null, 2)} -->
					</div>
				</LikeBtn>

				<hr class="my-6 border-gray-200 dark:border-gray-800 md:my-8" />

				<p class="mb-6 text-gray-500 dark:text-gray-400">
					Studio quality three mic array for crystal clear calls and voice recordings. Six-speaker
					sound system for a remarkably robust and high-quality audio experience. Up to 256GB of
					ultrafast SSD storage.
				</p>
			</div>

			<Accordion.Root class="w-full sm:max-w-[70%]">
				<Accordion.Item value="item-1">
					<Accordion.Trigger>Categories</Accordion.Trigger>
					<Accordion.Content>
						<div class="flex flex-wrap gap-2">
							{#each data.product.drug.categories as category}
								<a href="/categories/{category}">
									<Badge class="bg-neutral-700 dark:bg-neutral-700/60 dark:text-neutral-400"
										>{category}</Badge
									>
								</a>
							{/each}
						</div></Accordion.Content
					>
				</Accordion.Item>
				<Accordion.Item value="item-2">
					<Accordion.Trigger>Indications</Accordion.Trigger>
					<Accordion.Content>
						<div class="flex flex-wrap gap-2">
							{#each data.product.drug.indications as indication}
								<Badge>{indication}</Badge>
							{/each}
						</div>
					</Accordion.Content>
				</Accordion.Item>
				<Accordion.Item value="item-3">
					<Accordion.Trigger>Contra-Indications</Accordion.Trigger>
					<Accordion.Content>
						<div class="flex flex-wrap gap-2">
							{#each data.product.drug.contraIndications as contraIndication}
								<Badge variant="destructive">{contraIndication}</Badge>
							{/each}
						</div>
					</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>
		</div>
	</div>
</section>
