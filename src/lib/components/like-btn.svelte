<script lang="ts">
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import { toast } from 'svelte-sonner';

	dayjs.extend(relativeTime);

	// props
	import { badgeVariants } from './ui/badge';
	import { cn } from '$lib/utils';
	// icons
	import MaterialSymbolsLightKidStarOutline from '~icons/material-symbols-light/kid-star-outline';
	import MaterialSymbolsKidStar from '~icons/material-symbols/kid-star';
	import Loading from './loading.svelte';
	import { page } from '$app/stores';

	// props
	export let user;
	export let likes: number;
	export let isLikedByUser: boolean;
	export let id;
	let isHighlighted: boolean = isLikedByUser;
	let num = likes;
	let isLoading: boolean = false;

	const like = async () => {
		if (!user) {
			return toast('Unauthorized!', {
				description: 'You have to login first.'
			});
		}
		isLoading = true;
		const res = await fetch('/api/like', {
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
		console.log({ isLikedByUser, likesCount });
		num = likesCount;
		isHighlighted = isLikedByUser;
		isLoading = false;
	};
</script>

{#if $$slots.default}
	<slot {isLoading} {isHighlighted} {num} likeFn={like} />
{:else}
	<button
		class={cn(
			badgeVariants({ variant: 'outline' }),
			'h-[22px] min-w-14 justify-evenly gap-1 focus:ring-0',
			{
				'bg-blue-300/50 text-blue-600 hover:bg-blue-800/30 dark:bg-blue-500/20 dark:text-blue-200/90':
					isHighlighted
			}
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
