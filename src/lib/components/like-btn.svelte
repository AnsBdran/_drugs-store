<script lang="ts">
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import { toast } from 'svelte-sonner';
	import { badgeVariants } from './ui/badge';
	import { cn } from '$lib/utils';
	import Loading from './loading.svelte';
	import { page } from '$app/stores';
	import { pageSize } from '$lib/stores/page-size';
	import { goto } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';
	import * as _ from 'lodash-es';
	// icons
	import MaterialSymbolsLightKidStarOutline from '~icons/material-symbols-light/kid-star-outline';
	import MaterialSymbolsKidStar from '~icons/material-symbols/kid-star';

	let className = '';

	// props
	export let user;

	export let likes: number;
	export let isLikedByUser: boolean;
	export let id;
	export { className as class };

	dayjs.extend(relativeTime);
	$: isHighlighted = isLikedByUser;
	$: num = likes;
	$: isLoading = false;

	const dispatch = createEventDispatcher();

	const like = async () => {
		if (!user) {
			return toast('Unauthorized!', {
				description: 'You have to login first.'
			});
		}

		isLoading = true;
		const res = await fetch('/api/like', {
			cache: 'no-cache',
			method: 'POST',
			body: JSON.stringify({
				itemID: id,
				userID: user.id,
				modelType: $page.url.pathname.includes('request') ? 'request' : 'drug'
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const { likesCount, isLikedByUser } = await res.json();
		num = likesCount;
		isHighlighted = isLikedByUser;
		isLoading = false;
		// await goto($page.url.pathname, { invalidateAll: true });
		dispatch('dislike', { id });
	};
</script>

{#if $$slots.default}
	<slot {isLoading} {isHighlighted} {num} likeFn={like} />
{:else}
	<button
		class={cn(
			badgeVariants({ variant: 'outline' }),
			'!focus:ring-0 h-[22px] w-14 justify-evenly gap-1 text-xs !ring-0 focus:ring-offset-0 active:border-0 active:outline-0 active:ring-0',
			{
				'bg-blue-300/50 text-blue-600 hover:bg-blue-800/30 dark:bg-blue-500/20 dark:text-blue-200/90':
					isHighlighted
			},
			className
		)}
		disabled={isLoading}
		on:click={like}
	>
		{#if isLoading}
			<Loading className="space-x-[2px]" class=" bg-blue-800" />
		{:else}
			{num}
			{#if isHighlighted}
				<MaterialSymbolsKidStar />
			{:else}
				<MaterialSymbolsLightKidStarOutline />
			{/if}
		{/if}
	</button>
{/if}
