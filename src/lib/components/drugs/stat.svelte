<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { cn } from '$lib/utils';

	export let icon;
	export let title;
	export let value;
	// export let description = '';

	let className = '';
	export { className as class };
</script>

<div class={cn('flex space-x-4 rounded-lg bg-secondary p-4 sm:max-w-sm md:space-x-6', className)}>
	<div
		class="flex aspect-square items-center justify-center self-center rounded-lg p-2 dark:bg-primary sm:p-3"
	>
		<svelte:component this={icon} class="h-6 w-6 sm:h-8 sm:w-8" />
	</div>
	<div class="flex flex-col justify-center align-middle">
		<p class="text-xl font-semibold leading-none sm:text-3xl">{value}</p>
		<p class="!mt-0 text-sm capitalize text-muted-foreground sm:text-base">{title}</p>
	</div>
</div>
