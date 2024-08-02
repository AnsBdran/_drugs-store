<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Drug, DrugItem } from '@prisma/client';
	import LikeBtn from './like-btn.svelte';
	import { Badge } from './ui/badge';
	import { CldImage } from 'svelte-cloudinary';
	import { Button } from './ui/button';
	import { dimensions } from '$lib/stores/dimensions';
	import { page } from '$app/stores';
	import type { User } from 'lucia';

	let className: string | undefined | null = undefined;
	export let drug: DrugItem;

	const { store } = dimensions;
	$: width = $store.width;
	$: height = $store.height;

	export let aspectRatio: 'portrait' | 'square' = 'square';
	export { className as class };

	const user: User | null = $page.data.user;
	const isLikedByUser = user ? !!drug.likedBy.find((d) => d.userID === user.id) : false;
	console.log('exploring', $page);
</script>

<div
	class={cn('space-y-3 overflow-hidden ', className)}
	{...$$restProps}
	style={`width: ${width}px;`}
>
	<div
		class="relative overflow-hidden rounded-md border-2 border-transparent transition-all duration-500 hover:border-primary/50"
		style={`width: ${width}px; height: ${height}px;`}
	>
		<CldImage
			src={drug.image.public_id}
			alt={drug.drug.brandName}
			class={cn(
				'h-full w-full object-cover transition-all hover:scale-105',
				aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square'
			)}
			width="full"
			height="full"
		/>
		<Badge variant="secondary" class="absolute bottom-1 right-1 opacity-90">{drug.form}</Badge>
	</div>

	<div class="space-y-1 overflow-hidden text-sm">
		<div class="flex items-center justify-between pr-1">
			<h3 class="mb-0 truncate text-lg font-medium leading-none">
				<Button href="/product/{drug.id}" variant="link">
					{drug.drug.brandName ?? 'drug'}
				</Button>
			</h3>
			<LikeBtn id={drug.id} likes={drug.likes} {user} {isLikedByUser} />
		</div>
		<div>
			<span>NIS {drug.price.item}</span>
		</div>
		{#each drug.activeIngredients as ai}
			<Badge
				>{ai.name}
				{ai.strength.amount}
				{#if ai.strength.per !== 'unit'}
					/{ai.strength.per}
				{/if}
			</Badge>
		{/each}
	</div>
</div>
