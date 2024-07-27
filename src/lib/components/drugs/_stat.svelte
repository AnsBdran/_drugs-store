<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { cn } from '$lib/utils';

	export let icon;
	export let title;
	export let value;
	export let description = '';

	let className = '';
	export { className as class };
</script>

<Card.Root class={cn(className)}>
	<Card.Header class="">
		<div class="flex items-center justify-between">
			<span class="text-sm font-medium">{title}</span>
			<svelte:component this={icon} class="aspect-square" />
		</div>
	</Card.Header>
	<Card.Content>
		<div class="text-2xl font-bold">{value}</div>
		<p class="text-xs text-muted-foreground">{description}</p>
	</Card.Content>
</Card.Root>
