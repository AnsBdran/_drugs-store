<script lang="ts">
	import { RequestForm, RequestEditForm } from '$lib/components/form';
	import FormattedDate from '$lib/components/formatted-date.svelte';
	import Header from '$lib/components/header.svelte';
	import { Status } from '$lib/components/requests';
	import Btns from '$lib/components/tables/edit/btns.svelte';
	import Table from '$lib/components/tables/table.svelte';
	import type { Request } from '@prisma/client';
	import { createColumnHelper, renderComponent } from '@tanstack/svelte-table';

	export let data;

	const columnHelper = createColumnHelper<Request>();
	console.log('data here', data);

	const columns = [
		columnHelper.accessor('createdAt', {
			cell: (info) =>
				renderComponent(FormattedDate, {
					date: info.getValue()
				}),
			header: 'Date'
		}),
		columnHelper.accessor((row) => `${row.User.firstName} ${row.User.lastName}`, {
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
		columnHelper.accessor('votes', {}),
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
<Table {columns} data={data.requests} form={data.form} formComponent={RequestEditForm} />
