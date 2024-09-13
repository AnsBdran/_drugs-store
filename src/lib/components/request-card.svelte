<script lang="ts">
	import type { Request } from '@prisma/client';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from './ui/badge';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import { cn, fromNow } from '$lib/utils';

	// icons
	import Loading from './loading.svelte';
	import LikeBtn from './like-btn.svelte';
	import { page } from '$app/stores';
	import type { User } from 'lucia';

	dayjs.extend(relativeTime);

	// props
	// export let user;
	export let request: Request;
	// export let isLikedByUser: boolean;

	const user: User | null = $page.data.user;
	const isLikedByUser = user ? !!request.likedBy.find((v) => v.userID === user?.id) : false;

	let likes = request.likes;
	let isLiked: boolean = isLikedByUser;
</script>

<Card.Root class="!m-0">
	<Card.Header>
		<div class="flex items-center justify-between gap-3">
			<Card.Title class="!mt-0 mb-0 leading-none">{request.brandName}</Card.Title>
			<Badge class="self-center text-nowrap"
				>{request.Author.firstName} {request.Author.lastName}</Badge
			>
		</div>
		<Card.Description>{request.genericName}</Card.Description>
	</Card.Header>
	<Card.Content>
		<div></div>
	</Card.Content>
	<Card.Footer class="justify-end gap-3">
		<LikeBtn id={request.id} {user} isLikedByUser={isLiked} {likes} />
		<Badge variant="secondary">{fromNow(request.createdAt)}</Badge>
	</Card.Footer>
</Card.Root>
