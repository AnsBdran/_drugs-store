<script>
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { cn } from '$lib/utils';

	let className = '';
	export let width = 150;
	export let height = 150;
	export { className as class };
</script>

<div style={`width: ${width}px;`} class={cn(`flex flex-col space-y-3`, className)}>
	<Skeleton style={`width: ${width}px; height: ${height}px`} />
	<div class="flex flex-1 flex-col justify-between">
		<Skeleton class="h-4 w-3/4" />
		<Skeleton class="h-3 w-1/4" />
	</div>
</div>
