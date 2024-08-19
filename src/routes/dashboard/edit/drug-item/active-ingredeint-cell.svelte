<script>
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import * as Collapsible from '$lib/components/ui/collapsible';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import PhCaretUpDownBold from '~icons/ph/caret-up-down-bold';
	export let content;
</script>

<Collapsible.Root class="w-max min-w-[200px] text-wrap">
	<Collapsible.Trigger class="w-full">
		<Badge variant="outline" class="w-full justify-between py-2"
			>View <Badge variant="secondary" class="px-1">{content.length}</Badge> Active ingredients<PhCaretUpDownBold
			/></Badge
		>
	</Collapsible.Trigger>
	<Collapsible.Content class="mt-2 space-y-2">
		{#each content as ai}
			<div class="flex items-center justify-between rounded border px-2 py-1">
				{ai.name}
				<Badge class="flex items-center justify-start py-1">
					{ai.strength.amount}

					{#if ai.strength.per !== 'unit'}
						<Separator
							orientation="vertical"
							class="bg-primary-foreground text-primary-foreground"
						/>
						{ai.strength.per}
					{/if}
				</Badge>
			</div>
		{/each}
	</Collapsible.Content>
</Collapsible.Root>
