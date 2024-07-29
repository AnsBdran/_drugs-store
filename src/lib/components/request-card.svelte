<script lang="ts">
	import type { Request } from '@prisma/client';
	import * as Card from '$lib/components/ui/card';
	import { Badge, badgeVariants } from './ui/badge';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import { cn, fromNow } from '$lib/utils';
	import { toast } from 'svelte-sonner';
	import { enhance } from '$app/forms';

	// icons
	import MaterialSymbolsLightKidStarOutline from '~icons/material-symbols-light/kid-star-outline';
	import MaterialSymbolsKidStar from '~icons/material-symbols/kid-star';
	import Loading from './loading.svelte';

	dayjs.extend(relativeTime);

	// props
	export let user;
	export let request: Request;
	export let isLikedByUser;

	let likes = request.likes;
	let isLiked = isLikedByUser;
	let isLoading = false;
</script>

<Card.Root>
	<Card.Header>
		<div class="flex justify-between">
			<Card.Title>{request.brandName}</Card.Title>
			<Badge class="self-center">{request.Author.firstName} {request.Author.lastName}</Badge>
		</div>
		<Card.Description>{request.genericName}</Card.Description>
	</Card.Header>
	<Card.Content>
		<div></div>
	</Card.Content>
	<Card.Footer class="justify-end gap-3">
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
					update();
					console.log(result);
					if (result.type === 'success') {
						likes = result.data.request.likes;
						isLoading = false;
						isLiked = result.data.isLiked;
					} else {
						toast('Error', {
							description: 'Something bad happens on our end, try again!'
						});
						isLoading = false;
					}
				};
			}}
		>
			<input type="hidden" name="requestID" value={request.id} />
			<input type="hidden" name="userID" value={user ? user.id : null} />

			<button
				class={cn(badgeVariants({ variant: 'outline' }), 'h-[22px] min-w-14 justify-evenly gap-1', {
					'bg-blue-300/50 text-blue-600 hover:bg-blue-800/30 dark:bg-blue-500/20 dark:text-blue-200/90':
						isLiked
				})}
			>
				{#if isLoading}
					<Loading className="space-x-[2px]" class=" bg-blue-800" />
				{:else}
					{likes}
					{#if isLiked}
						<MaterialSymbolsKidStar />
					{:else}
						<MaterialSymbolsLightKidStarOutline />
					{/if}
				{/if}
			</button>
		</form>
		<Badge variant="secondary">{fromNow(request.createdAt)}</Badge>
	</Card.Footer>
</Card.Root>
