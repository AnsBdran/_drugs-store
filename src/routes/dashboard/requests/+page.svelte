<script lang="ts">
	import Alert from '$lib/components/alert.svelte';
	import { RequestEditForm } from '$lib/components/form';
	import FormattedDate from '$lib/components/formatted-date.svelte';
	import { Status } from '$lib/components/requests';
	import Btns from '$lib/components/tables/edit/btns.svelte';
	import Table from '$lib/components/tables/table.svelte';
	import { requestEditSchema } from '$lib/schemas/request';
	import { fromNow } from '$lib/utils.js';
	import type { Request } from '@prisma/client';
	import { createColumnHelper, renderComponent } from '@tanstack/svelte-table';

	export let data;

	const columnHelper = createColumnHelper<Request>();

	const columns = [
		columnHelper.accessor('createdAt', {
			header: 'Time added',
			cell: (info) => fromNow(info.getValue())
		}),
		columnHelper.accessor((row) => `${row.Author.firstName} ${row.Author.lastName}`, {
			header: 'User'
		}),
		columnHelper.group({
			header: 'Name',
			columns: [
				columnHelper.accessor('brandName', {
					header: 'Brand'
				}),
				columnHelper.accessor('genericName', { header: 'Generic' })
			]
		}),
		columnHelper.accessor('strength', {}),
		columnHelper.accessor('responseStatus', {
			header: 'Status',
			cell: (info) =>
				renderComponent(Status, {
					value: info.getValue()
				})
		}),
		columnHelper.accessor('likes', {}),
		columnHelper.display({
			cell: (info) =>
				renderComponent(Btns, {
					row: info.row.original
				}),
			header: 'Actions'
		})
	];
</script>

<h2>requests</h2>
{#if data.requests.length}
	<Table
		{columns}
		data={data.requests}
		validatedForm={data.form}
		schema={requestEditSchema}
		let:form
		let:initialValues
	>
		<RequestEditForm {form} {initialValues} />
	</Table>
{:else}
	<Alert title="No requests were found">You don't have any requests.</Alert>
{/if}
