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

<Card.Root class="">
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
		<LikeBtn id={request.id} {user} isLikedByUser={isLiked} {likes} />
		<Badge variant="secondary">{fromNow(request.createdAt)}</Badge>
	</Card.Footer>
</Card.Root>

<a href="/" class="group block overflow-hidden">
	<div class="relative h-[350px] sm:h-[450px]">
		<img
			src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80"
			alt=""
			class="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
		/>

		<img
			src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80"
			alt=""
			class="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
		/>
	</div>

	<div class="relative bg-white pt-3">
		<h3 class="text-sm text-gray-700 group-hover:underline group-hover:underline-offset-4">
			Limited Edition Sports Trainer
		</h3>

		<div class="mt-1.5 flex items-center justify-between text-gray-900">
			<p class="tracking-wide">$189.99</p>

			<p class="text-xs uppercase tracking-wide">6 Colors</p>
		</div>
	</div>
</a>
