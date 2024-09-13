<script>
	import * as Card from '$lib/components/ui/card';
	import Skeleton from '../ui/skeleton/skeleton.svelte';
</script>

<Card.Root class="!m-0">
	<Card.Header>
		<div class="mb-2 flex items-center justify-between gap-3">
			<Skeleton class="h-6 w-3/5 " />
			<Skeleton class="h-4 w-1/5" />
		</div>
		<Card.Description>
			<Skeleton class="h-3 w-2/5" />
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<div></div>
	</Card.Content>
	<Card.Footer class="justify-end gap-3">
		<Skeleton class="h-4 w-12" />
		<Skeleton class="h-4 w-20" />
	</Card.Footer>
</Card.Root>
