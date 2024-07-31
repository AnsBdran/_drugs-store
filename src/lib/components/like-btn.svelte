<script lang="ts">
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import { toast } from 'svelte-sonner';
	import { enhance } from '$app/forms';

	dayjs.extend(relativeTime);

	// props
	import { badgeVariants } from './ui/badge';
	import { cn } from '$lib/utils';
	// icons
	import MaterialSymbolsLightKidStarOutline from '~icons/material-symbols-light/kid-star-outline';
	import MaterialSymbolsKidStar from '~icons/material-symbols/kid-star';
	import Loading from './loading.svelte';

	// props
	export let user;
	export let likes: number;
	export let isLikedByUser: boolean;
	export let id;

	let isHighlighted = isLikedByUser;
	let num = likes;
	let isLoading: boolean = false;
</script>

<form
	action="?/like"
	method="post"
	use:enhance={({ cancel }) => {
		if (!user) {
			cancel();
			toast('Log in', {
				description: 'You can not submit a like unless you are logged in.'
			});
		} else {
			isLoading = true;
		}
		return async ({ update, result }) => {
			update({
				invalidateAll: false
			});
			console.log(result);
			if (result.type === 'success') {
				num = result.data.likesCount;
				isLoading = false;
				isHighlighted = result.data.isLikedByUser;
			} else {
				toast('Error', {
					description: 'Something bad happens on our end, try again!'
				});
				isLoading = false;
			}
		};
	}}
>
	<input type="hidden" name="itemID" value={id} />
	<input type="hidden" name="userID" value={user ? user.id : null} />

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
</form>
