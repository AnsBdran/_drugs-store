<script lang="ts">
	import { cn } from '$lib/utils';
	import type { BadgeProps } from 'svelte-radix/Badge.svelte';
	import Badge from './ui/badge/badge.svelte';

	export let value: App.USER_ROLE;
	// let className;
	let variant: 'default' | 'secondary' | 'destructive' | 'outline';

	switch (value) {
		case 'ADMIN':
			// className = 'bg-blue-400';
			variant = 'default';

			break;
		case 'SUPER_ADMIN':
			// className = 'bg-green-200';
			variant = 'destructive';
			break;
		case 'USER':
			// className = 'bg-blue-300';
			variant = 'outline';
			break;
	}
</script>

<Badge class={cn()} size="sm" {variant}>
	{value}
</Badge>
