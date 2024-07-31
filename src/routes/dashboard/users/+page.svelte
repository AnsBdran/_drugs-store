<script lang="ts">
	import { EditUserForm } from '$lib/components/form';
	import RoleStatus from '$lib/components/role-status.svelte';
	import Btns from '$lib/components/tables/edit/btns.svelte';
	import Table from '$lib/components/tables/table.svelte';
	import { fromNow } from '$lib/utils';
	import type { User } from '@prisma/client';
	import { createColumnHelper, renderComponent } from '@tanstack/svelte-table';

	export let data;
	const columnHelper = createColumnHelper<User>();
	const columns = [
		columnHelper.accessor('createdAt', {
			header: 'Join date',
			cell: (info) => fromNow(info.getValue())
		}),
		columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
			header: 'Name'
		}),
		columnHelper.accessor('username', {
			header: 'Username'
		}),
		columnHelper.accessor('role', {
			header: 'Role',
			cell: (info) =>
				renderComponent(RoleStatus, {
					value: info.getValue()
				})
		}),
		columnHelper.display({
			cell: (info) =>
				renderComponent(Btns, {
					row: info.row.original
				}),
			header: 'Action'
		})
	];
</script>

<h2>Users</h2>
<Table {columns} data={data.users} form={data.form} formComponent={EditUserForm} />
<!-- <pre>
    {JSON.stringify(data.users, null, 2)}
</pre> -->
