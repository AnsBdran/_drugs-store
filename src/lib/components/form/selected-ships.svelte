<script>
	import { createEventDispatcher } from 'svelte';
	import { Badge } from '$lib/components/ui/badge';
	import MaterialSymbolsLightDeleteForeverOutlineSharp from '~icons/material-symbols-light/delete-forever-outline-sharp';
	export let selected;
	import { slide } from 'svelte/transition';

	// $: console.log('ships', selected);

	const dispatch = createEventDispatcher();
</script>

{#if selected.length > 0}
	<div class="flex flex-wrap gap-1">
		{#each selected as item (item.value)}
			<button on:click={() => dispatch('delete', item)} transition:slide type="button">
				<Badge variant="secondary" class="text-xs">
					{item.label}
					<MaterialSymbolsLightDeleteForeverOutlineSharp />
				</Badge>
			</button>
		{/each}
	</div>
{/if}
