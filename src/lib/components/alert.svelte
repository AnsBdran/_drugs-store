<script lang="ts">
	import * as Alert from '$lib/components/ui/alert';
	import { cn } from '$lib/utils';

	// icons
	import IconamoonInformationSquareDuotone from '~icons/iconamoon/information-square-duotone';
	import StreamlineChatBubbleSquareWarning from '~icons/streamline/chat-bubble-square-warning';
	import WeuiReportProblemFilled from '~icons/weui/report-problem-filled';
	import MaterialSymbolsDirectorySync from '~icons/material-symbols/directory-sync';
	import Button from './ui/button/button.svelte';
	import { page } from '$app/stores';
	// ===================================
	export let type: 'warning' | 'error' | 'info' = 'info';
	export let showRefresh: boolean = false;

	let className = '';
	export { className as class };
	$: color = 'indigo';
	let icon = IconamoonInformationSquareDuotone;
	if (type === 'error') {
		icon = WeuiReportProblemFilled;
		color = 'red';
	} else if (type === 'warning') {
		icon = StreamlineChatBubbleSquareWarning;
		color = 'yellow';
	}

	export let title: string = 'Heads Up!';
</script>

<!-- class={cn(
		`border-${color}-500 border-l-${color}-400 bg-${color}-100 dark:bg-${color}-800 relative border-2 border-l-[8px] text-${color}-900`
		)} -->
<Alert.Root
	class={cn(
		'relative min-w-60 border border-l-[8px]',
		{
			' border-indigo-500 border-l-indigo-400 bg-indigo-100 text-indigo-800 shadow-inner dark:border-l-indigo-400 dark:bg-indigo-950 dark:text-indigo-200':
				type === 'info',
			'border-destructive/70 border-l-destructive/40 bg-destructive/10 text-destructive dark:border-l-destructive-foreground/60 dark:bg-destructive/90 dark:text-destructive-foreground':
				type === 'error',
			'': type === 'warning'
		},
		className
	)}
>
	<div class="flex items-start gap-2">
		<div>
			<svelte:component this={icon} class="block flex-1  text-xl " />
		</div>
		<div class="pt-0">
			<Alert.Title class="text-lg">{title}</Alert.Title>
			<Alert.Description style="opacity: 0.9;" class="text-current text-opacity-40"
				><slot /></Alert.Description
			>
		</div>
	</div>
	{#if showRefresh}
		<Button
			size="icon"
			variant="ghost"
			class={cn('absolute right-1 top-1  size-7 ', {
				'hover:bg-indigo-300 hover:bg-opacity-30 ': type === 'info',
				' hover:bg-inherit hover:bg-opacity-100 hover:text-current dark:hover:bg-destructive-foreground/30':
					type === 'error'
			})}
			href={$page.url.pathname}
			data-sveltekit-reload><MaterialSymbolsDirectorySync /></Button
		>
	{/if}
</Alert.Root>
