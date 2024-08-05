<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { CldImage } from 'svelte-cloudinary';
	import IcRoundFavoriteBorder from '~icons/ic/round-favorite-border';
	import IcTwotoneFavorite from '~icons/ic/twotone-favorite';
	import { cn, fromNow } from '$lib/utils';
	import LikeBtn from '$lib/components/like-btn.svelte';
	import Loading from '$lib/components/loading.svelte';
	import * as Collapsible from '$lib/components/ui/collapsible';
	import TablerCurrencyShekel from '~icons/tabler/currency-shekel';
	export let data;

	import PhCaretUpDownBold from '~icons/ph/caret-up-down-bold';
	const { product, user } = data;

	$: isLikedByUser = user ? !!product?.likedBy.find((p) => p.userID === user.id) : false;
</script>

<section class="bg-white py-8 antialiased dark:bg-background md:py-16">
	<div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
		<div class="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
			<div class="mx-auto max-w-md shrink-0 lg:max-w-lg">
				<CldImage src={product?.image.public_id} alt={product?.drug.brandName} />
			</div>

			<div class="mt-6 sm:mt-8 lg:mt-0">
				<div class="flex items-start justify-between">
					<h1 class="sm:text-6x mb-0 text-4xl font-semibold text-primary">
						{product?.drug.brandName}
					</h1>
					<Collapsible.Root class="space-y-2">
						<Collapsible.Trigger>
							<Button variant="ghost" class="gap-3"
								>Drug Active Ingredients
								<PhCaretUpDownBold />
							</Button>
						</Collapsible.Trigger>

						<Collapsible.Content class="space-y-2">
							{#each product?.activeIngredients as ai}
								<p class="flex justify-between rounded border px-4 py-1">
									{ai.name}<Badge variant="secondary">
										{ai.strength.amount}
										{#if ai.strength.per !== 'unit'}
											/{ai.strength.per}
										{/if}
									</Badge>
								</p>
							{/each}
						</Collapsible.Content>
					</Collapsible.Root>
				</div>
				<div class="mt-4 flex sm:items-center sm:gap-4">
					<p
						class="flex items-center text-3xl font-normal text-gray-900 dark:text-white sm:text-3xl"
					>
						<TablerCurrencyShekel />
						{product?.price.item}
					</p>
				</div>
				<LikeBtn
					{user}
					{isLikedByUser}
					id={product?.id}
					likes={product?.likes}
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
			<section class="space-y-3 [&>*]:rounded-sm">
				<div class="bg-neutral-800/15 p-3 dark:bg-neutral-600/10">
					<h4 class="mb-2 text-neutral-800/80 dark:text-neutral-400">Categories</h4>
					<div class="flex gap-2">
						{#each product.drug.categories as category}
							<a href="/categories/{category}">
								<Badge class="bg-neutral-700 dark:bg-neutral-700/60 dark:text-neutral-400"
									>{category}</Badge
								>
							</a>
						{/each}
					</div>
				</div>

				<div class="bg-primary/10 p-3">
					<h4 class="mb-2 text-primary/80">Indications</h4>
					<div class="flex gap-2">
						{#each product.drug.indications as indication}
							<Badge>{indication}</Badge>
						{/each}
					</div>
				</div>

				<div class="bg-destructive/15 p-3">
					<h4 class="mb-2 text-destructive/80">Contra-Indications</h4>
					<div class="flex gap-2">
						{#each product.drug.contraIndications as contraIndication}
							<Badge variant="destructive">{contraIndication}</Badge>
						{/each}
					</div>
				</div>
			</section>
		</div>
	</div>
</section>
