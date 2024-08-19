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
	import { rowEditStore } from '$lib/stores/row-edit';
	import { writable } from 'svelte/store';
	import { rankItem } from '@tanstack/match-sorter-utils';
	import Input from '../ui/input/input.svelte';
	import Pagination from './pagination.svelte';
	import ScrollArea from '../ui/scroll-area/scroll-area.svelte';

	// type SingleT<T> = T extends (infer U)[] ? U : never;
	// type SingleElementType<T> = T extends (infer U)[] ? U : never;
	// export let data: SingleElementType<any>[];
	// type DataType = SingleElementType<typeof data>;
	// props
	export let data;
	export let form;
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

	// const { editRowStore } = createRowEditStore();

	const options = writable<TableOptions<typeof data>>({
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
	<!-- <div class="mb-3 flex flex-col items-start justify-between gap-1 border border-muted lg:flex-row">
	</div> -->
	<!-- class="block w-max border-none py-2" -->
	<Input
		class="block w-max py-2"
		type="search"
		on:keyup={handleKeyUp}
		bind:value={gloablFilter}
		placeholder="Filter..."
	/>
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
							<Table.Cell class="text-nowrap">
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
<Pagination count={data.length} {perPage} bind:page class="w-max" />

<!-- Form dialogs -->
<EditDialog data={form} {schema} let:form>
	<slot {form} initialValues={$rowEditStore.data} />
</EditDialog>
<DeleteDialog />
