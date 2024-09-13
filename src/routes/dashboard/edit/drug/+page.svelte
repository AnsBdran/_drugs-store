<script lang="ts">
	import type { Drug } from '@prisma/client';
	import Table from '$lib/components/tables/table.svelte';
	import { createColumnHelper, renderComponent } from '@tanstack/svelte-table';
	import { DrugForm } from '$lib/components/form';
	import Btns from '$lib/components/tables/edit/btns.svelte';
	import Alert from '$lib/components/alert.svelte';
	import { drugSchema } from '$lib/schemas/drug';
	import Ships from './ships.svelte';

	export let data;

	const columnHelper = createColumnHelper<Drug>();
	const columns = [
		columnHelper.accessor('brandName', {
			header: 'Brand Name'
		}),
		columnHelper.accessor('categories', {
			cell: (info) => renderComponent(Ships, { content: info.getValue() })
		}),

		columnHelper.accessor('indications', {
			cell: (info) => renderComponent(Ships, { content: info.getValue() })
		}),
		columnHelper.accessor('contraIndications', {
			cell: (info) => renderComponent(Ships, { content: info.getValue() })
		}),
		// columnHelper.accessor('description', {
		// 	// cell: (info) => renderComponent()
		// }),

		columnHelper.display({
			header: 'Actions',
			cell: (info) =>
				renderComponent(Btns, {
					row: info.row.original
				})
		})
	];
</script>

{#if data.drugs.length}
	<Table
		{columns}
		data={data.drugs}
		validatedForm={data.form}
		let:form
		let:initialValues
		schema={drugSchema}
	>
		<DrugForm info={data.info} manufacturers={data.manufacturers} {form} {initialValues} />
	</Table>
{:else}
	<Alert title="You don't have any drugs added yet">
		Head over to the
		<a
			href="/dashboard/create"
			class="underline decoration-wavy decoration-2 underline-offset-4 hover:underline-offset-2"
			>create</a
		> page and add new items.
	</Alert>
{/if}
