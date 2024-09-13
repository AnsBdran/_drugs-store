<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import type { DrugItem, Manufacturer, Request, User } from '@prisma/client';
	import MdiLeadPencil from '~icons/mdi/lead-pencil';
	import MaterialSymbolsDeleteRounded from '~icons/material-symbols/delete-rounded';
	import { rowEditStore } from '$lib/stores/row-edit';
	import type { Drug } from '$lib/types';
	// props
	export let row: Manufacturer | DrugItem | Request | User | Drug;

	const setEditRow = (
		isEditOpen: boolean,
		isDeleteOpen: boolean,
		row: Manufacturer | DrugItem | Request | User | Drug | null
	) => {
		rowEditStore.set({ data: row, isEditOpen, isDeleteOpen });
	};
</script>

<div class="flex gap-1">
	<Button
		variant="secondary"
		size="icon"
		on:click={() => {
			setEditRow(true, false, row);
		}}
	>
		<MdiLeadPencil />
	</Button>
	<Button
		size="icon"
		variant="ghost"
		class="bg-destructive/20 text-destructive hover:bg-destructive/10 hover:text-destructive dark:bg-destructive/80 dark:text-destructive-foreground dark:hover:bg-destructive/70"
		on:click={() => setEditRow(false, true, row)}
	>
		<MaterialSymbolsDeleteRounded />
	</Button>
</div>
