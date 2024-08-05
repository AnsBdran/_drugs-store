<script>
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { dimensions } from '$lib/stores/dimensions';
	import { cn } from '$lib/utils';

	let className = '';

	const { store } = dimensions;
	// const { width, height } = $store;
	$: width = $store.width;
	$: height = $store.height;
	export { className as class };
</script>

<div style={`width: ${width}px;`} class={cn(`space-y-3`, className)}>
	<Skeleton style={`width: ${width}px; height: ${height}px`} />
	<div class="flex items-center justify-between">
		<Skeleton class="h-4 w-1/4" />
		<Skeleton class="h-4 w-1/4" />
	</div>
	<div class="flex items-center justify-between">
		<Skeleton class="h-4 w-1/5" />
		<Skeleton class="h-4 w-2/5" />
	</div>
</div>
