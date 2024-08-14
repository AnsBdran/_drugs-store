<script>
	import Skeleton from '../ui/skeleton/skeleton.svelte';
	import * as Card from '$lib/components/ui/card';
	import { cn } from '$lib/utils';

	let className = '';
	export { className as class };
</script>

<!-- <Card.Root class={className}>
	<Card.Header>
		<div class="flex items-center justify-between">
			<Skeleton class="h-4 w-3/5" />
			<Skeleton class="h-6 w-6" />
		</div>
	</Card.Header>
	<Card.Content>
		<div class="h-8">
			<Skeleton class="h-6 w-1/2 text-2xl" />
		</div>
		<Skeleton class="mt-6 h-3 w-2/3" />
	</Card.Content>
</Card.Root> -->
<div
	class={cn(
		'flex items-center gap-3 rounded-lg bg-secondary p-4 dark:bg-secondary/20 sm:max-w-sm sm:gap-6',
		className
	)}
>
	<Skeleton class="h-10 w-10 sm:h-14 sm:w-14 " />

	<div class="flex flex-1 flex-col justify-center align-middle">
		<Skeleton class="h-5 w-1/2" />
		<Skeleton class="mt-3 h-5 w-3/4" />
	</div>
</div>
