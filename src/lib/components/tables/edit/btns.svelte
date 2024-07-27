<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import type { DrugItem, Manufacturer, Request } from '@prisma/client';
	import MdiLeadPencil from '~icons/mdi/lead-pencil';
	import MaterialSymbolsDeleteRounded from '~icons/material-symbols/delete-rounded';
	import { rowChanges } from '$lib/stores/table.store';
	// props
	export let row: Manufacturer | DrugItem | Request;

	const setEditRow = (
		isEditOpen: boolean,
		isDeleteOpen: boolean,
		row: Manufacturer | DrugItem | Request | null
	) => {
		// console.log('received', row);
		// row?.imageURL ?? delete row?.imageURL;
		// console.log('deleted', row);
		rowChanges.set({ data: row, isEditOpen, isDeleteOpen });
	};
</script>

<div class="flex gap-1">
	<Button size="icon" on:click={() => setEditRow(true, false, row)}>
		<MdiLeadPencil />
	</Button>
	<Button size="icon" variant="destructive" on:click={() => setEditRow(false, true, row)}>
		<MaterialSymbolsDeleteRounded />
	</Button>
</div>
