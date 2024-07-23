<script lang="ts">
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { cn } from '$lib/utils';
	export let content;
	let value = Number(content);
	export let type: 'item' | 'batch' = 'item';
	let appearance: string;

	switch (true) {
		case type === 'item' ? value <= 10 : value <= 30:
			appearance = 'bg-green-50/5 text-green-700';
			break;
		case type === 'item' ? value <= 20 : value <= 50:
			appearance = 'bg-yellow-100/5 text-yellow-700';
			break;
		default:
			appearance = 'bg-red-100/5 text-red-700';
	}
</script>

<Badge variant="secondary" class={cn(appearance, 'text-sm tracking-wider')}>
	{content}
</Badge>
