<script>
	import { cn } from '$lib/utils';

	let className = '';
	export { className as class };
</script>

<div class="flex items-center justify-center space-x-2">
	<div class={cn('h-2 w-2 animate-pulse rounded-full', className)}></div>
	<div class={cn('h-2 w-2 animate-pulse rounded-full', className)}></div>
	<div class={cn('h-2 w-2 animate-pulse rounded-full', className)}></div>
</div>
