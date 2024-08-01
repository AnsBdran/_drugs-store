<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Drug, DrugItem } from '@prisma/client';
	import LikeBtn from './like-btn.svelte';
	import { Badge } from './ui/badge';
	import { CldImage } from 'svelte-cloudinary';
	import { Button } from './ui/button';

	let className: string | undefined | null = undefined;
	export let drug: DrugItem;
	export let width: number;
	export let height: number;
	export let aspectRatio: 'portrait' | 'square' = 'square';
	export { className as class };

	export let user;
	console.log('drug', drug);
	export let isLikedByUser: boolean;
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
			<span>{drug.price.item}</span>
		</div>
	</div>
</div>
