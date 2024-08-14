<script lang="ts">
	import type { Drug } from '$lib/types';
	import Table from '$lib/components/tables/table.svelte';
	import { createColumnHelper, renderComponent } from '@tanstack/svelte-table';
	import { DrugForm } from '$lib/components/form';
	import Btns from '$lib/components/tables/edit/btns.svelte';
	import Alert from '$lib/components/alert.svelte';

	export let data;

	const columnHelper = createColumnHelper<Drug>();
	const columns = [
		columnHelper.accessor('brandName', {
			header: 'Brand Name'
		}),

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
		form={data.form}
		formComponent={DrugForm}
		info={data.info}
		manufacturers={data.manufacturers}
	/>
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
