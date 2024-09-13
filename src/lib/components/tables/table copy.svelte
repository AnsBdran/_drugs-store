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
	import TableWrapper from './_table.svelte';
	import { rowEditStore } from '$lib/stores/row-edit';
	import { writable } from 'svelte/store';
	import { rankItem } from '@tanstack/match-sorter-utils';
	import Input from '../ui/input/input.svelte';
	import Pagination from './pagination.svelte';
	import ScrollArea from '../ui/scroll-area/scroll-area.svelte';
	import SuperDebug from 'sveltekit-superforms';

	// type SingleT<T> = T extends (infer U)[] ? U : never;
	// type SingleElementType<T> = T extends (infer U)[] ? U : never;
	// export let data: SingleElementType<any>[];
	// type DataType = SingleElementType<typeof data>;
	// props
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

<!-- Form dialogs -->
<TableWrapper>
	<EditDialog data={validatedForm} {schema} let:form let:initialValues>
		<!-- <SuperDebug data={form.form} /> -->
		<slot {form} {initialValues} />
	</EditDialog>
	<DeleteDialog />
</TableWrapper>
