<script>
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import * as Collapsible from '$lib/components/ui/collapsible';
	import PhCaretUpDownBold from '~icons/ph/caret-up-down-bold';

	export let content;
</script>

<Collapsible.Root class="w-[200px] text-wrap">
	<Collapsible.Trigger class="w-full">
		<Badge variant="outline" class="w-full justify-between gap-3 px-3 py-2">
			{content.length} item <PhCaretUpDownBold />
		</Badge>
	</Collapsible.Trigger>
	<Collapsible.Content>
		<div class="mt-3 flex flex-wrap gap-2">
			{#each content as item}
				<Badge variant="outline" class="px-2 py-1">{item}</Badge>
			{/each}
		</div>
	</Collapsible.Content>
</Collapsible.Root>
