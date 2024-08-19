<script lang="ts">
	import { type DrugItem } from '@prisma/client';
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
		columnHelper.accessor('activeIngredients', {
			// columnHelper.accessor((row) => row.activeIngredients.map((ai) => `${ai.name}`), {
			header: 'Active Ingredients',
			cell: (info) => renderComponent(ActiveIngredeintCell, { content: info.getValue() })
		}),
		// columnHelper.accessor('activeIngredients', {
		// 	header: 'Active Ingredients'
		// }),
		// columnHelper.group({
		// 	header: 'Active Ingredients',
		// 	columns: [
		// 		columnHelper.accessor((row) => row.activeIngredients.map((item) => item.name), {
		// 			header: 'AI name'
		// 		}),
		// 		columnHelper.accessor(
		// 			(row) => {
		// 				return row.activeIngredients.map(
		// 					(item) => `${item.strength.amount} / ${item.strength.per}\n`
		// 				);
		// 			},
		// 			{
		// 				header: 'strength'
		// 			}
		// 		)
		// 	]
		// }),
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

<!-- <Table
	{columns}
	data={data.drugItems}
	form={data.form}
	formComponent={DrugItemForm}
	drugs={data.drugs}
	info={data.info}
/> -->
<Table
	data={data.drugItems}
	form={data.form}
	{columns}
	let:form
	let:initialValues
	schema={drugItemSchema}
>
	<DrugItemForm {form} {initialValues} info={data.info} drugs={data.drugs} />
</Table>
