<script>
	import { cn } from '$lib/utils';

	let _class = '';
	export let className = '';
	export { _class as class };
</script>

<div class={cn('flex items-center justify-center space-x-2', className)}>
	<div class={cn('h-2 w-2 animate-pulse rounded-full', _class)}></div>
	<div class={cn('h-2 w-2 animate-pulse rounded-full', _class)}></div>
	<div class={cn('h-2 w-2 animate-pulse rounded-full', _class)}></div>
</div>
