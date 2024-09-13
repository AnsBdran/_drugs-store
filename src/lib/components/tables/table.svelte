<script lang="ts" generics="T">
	import * as Table from '$lib/components/ui/table';
	import {
		createSvelteTable,
		flexRender,
		getCoreRowModel,
		getFilteredRowModel,
		getPaginationRowModel,
		type FilterFn,
		type TableOptions
	} from '@tanstack/svelte-table';
	import EditDialog from './edit/edit-dialog.svelte';
	import DeleteDialog from './edit/delete-dialog.svelte';
	import { writable } from 'svelte/store';
	import { rankItem } from '@tanstack/match-sorter-utils';
	import Input from '../ui/input/input.svelte';
	import Pagination from './pagination.svelte';
	import ScrollArea from '../ui/scroll-area/scroll-area.svelte';
	import Separator from '../ui/separator/separator.svelte';

	export let data;
	export let validatedForm;
	export let columns;
	export let schema;

	// table props
	let gloablFilter = '';
	let page = 1;
	let perPage = 9;
	const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
		const itemRank = rankItem(row.getValue(columnId), value);
		addMeta({ itemRank });
		return itemRank.passed;
	};

	const options = writable<TableOptions<T>>({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
		filterFns: {
			fuzzy: fuzzyFilter
		},
		state: {
			pagination: {
				pageIndex: page - 1,
				pageSize: perPage
			}
		},
		enableMultiRowSelection: true,
		getPaginationRowModel: getPaginationRowModel(),
		globalFilterFn: fuzzyFilter,
		getFilteredRowModel: getFilteredRowModel(),
		autoResetPageIndex: true
	});

	// handle updates
	$: options.update((old) => ({
		...old,
		data: data,
		state: {
			...old.state,
			pagination: {
				pageSize: old?.state?.pagination?.pageSize as number,
				pageIndex: page - 1
			}
		}
	}));
	const table = createSvelteTable(options);

	const handleKeyUp = (e: any) => {
		$table.setGlobalFilter(String(e.target.value));
	};
</script>

<section>
	<Input
		class="block w-max py-2"
		type="search"
		on:keyup={handleKeyUp}
		bind:value={gloablFilter}
		placeholder="Filter..."
	/>
	<Separator class="my-8" />
	<ScrollArea orientation="horizontal" class="pb-2">
		<Table.Root>
			<Table.Header>
				{#each $table.getHeaderGroups() as headerGroup}
					<Table.Row>
						{#each headerGroup.headers as header}
							<Table.Cell colspan={header.colSpan}>
								{#if !header.isPlaceholder}
									<svelte:component
										this={flexRender(header.column.columnDef.header, header.getContext())}
									/>
								{/if}
							</Table.Cell>
						{/each}
					</Table.Row>
				{/each}
			</Table.Header>
			<Table.Body>
				{#each $table.getRowModel().rows as row}
					<Table.Row>
						{#each row.getVisibleCells() as cell}
							<Table.Cell class="text-nowrap align-top">
								<svelte:component
									this={flexRender(cell.column.columnDef.cell, cell.getContext())}
								/>
							</Table.Cell>
						{/each}
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</ScrollArea>
</section>
<Separator class="my-8" />

<Pagination count={data.length} {perPage} bind:page class="w-max" />
<!-- Form dialogs -->
<EditDialog data={validatedForm} {schema} let:form let:initialValues>
	<slot {form} {initialValues} />
</EditDialog>
<DeleteDialog />
