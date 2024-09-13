<script lang="ts">
	import { type DrugItem, type Info } from '@prisma/client';
	import { createColumnHelper, renderComponent, type ColumnDef } from '@tanstack/svelte-table';
	import Btns from '$lib/components/tables/edit/btns.svelte';
	import Table from '$lib/components/tables/table.svelte';
	import { DrugItemForm } from '$lib/components/form';
	import Ship from '$lib/components/tables/edit/price-ship.svelte';
	import ActiveIngredeintCell from './active-ingredeint-cell.svelte';
	import { drugItemSchema } from '$lib/schemas/drug-item';

	// props
	export let data;

	// vars
	const columnHelper = createColumnHelper<DrugItem>();

	const columns: ColumnDef<DrugItem>[] = [
		{
			accessorKey: 'drug.brandName',
			header: () => 'Brand Name'
		},
		{
			accessorKey: 'form',
			header: 'Drug form'
		},
		// columnHelper.accessor((row) => row.activeIngredients.map((ai) => `${ai.name}`), {
		columnHelper.accessor('activeIngredients', {
			header: 'Active Ingredients',
			cell: (info) => renderComponent(ActiveIngredeintCell, { content: info.getValue() })
		}),
	
		columnHelper.group({
			header: 'Price',
			columns: [
				columnHelper.accessor((row) => row.price.item, {
					header: 'item',
					cell: (info) =>
						renderComponent(Ship, {
							content: info.getValue()
						})
				}),
				columnHelper.accessor((row) => row.price.batch, {
					header: 'batch',
					cell: (info) =>
						renderComponent(Ship, {
							content: info.getValue(),
							type: 'batch'
						})
				})
			]
		}),
		{
			header: 'Actions',
			cell: (info) => renderComponent(Btns, { row: info.row.original })
		}
	];
</script>

<Table
	data={data.drugItems}
	validatedForm={data.form}
	{columns}
	let:form
	let:initialValues
	schema={drugItemSchema}
>
	<DrugItemForm hideImageInput {form} {initialValues} info={data.info} drugs={data.drugs} />
</Table>
