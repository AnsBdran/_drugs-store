<script lang="ts">
	import type { Manufacturer } from '@prisma/client';
	import { createColumnHelper, renderComponent, type ColumnDef } from '@tanstack/svelte-table';
	import Btns from '$lib/components/tables/edit/btns.svelte';
	import Table from '$lib/components/tables/table.svelte';
	import { ManufacturerForm } from '$lib/components/form';
	import { manufacturerSchema } from '$lib/schemas/manufacturer.js';

	// props
	export let data;

	const columnHelper = createColumnHelper<Manufacturer>();
	const columns: ColumnDef<Manufacturer>[] = [
		{
			accessorKey: 'name'
		},
		{
			accessorKey: 'country'
		},
		{
			accessorKey: 'city'
		},
		{
			accessorKey: 'featured'
		},

		{
			header: 'Actions',
			cell: (info) => renderComponent(Btns, { row: info.row.original })
		}
	];
</script>

<Table
	data={data.manufacturers}
	form={data.form}
	schema={manufacturerSchema}
	{columns}
	let:form
	let:initialValues
>
	<ManufacturerForm {form} {initialValues} />
</Table>
