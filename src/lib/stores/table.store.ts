import type { DrugItem, Manufacturer } from '@prisma/client';
import { writable } from 'svelte/store';

export const rowChanges = writable<{
	data: Manufacturer| DrugItem | null;
	isEditOpen: boolean;
	isDeleteOpen: boolean;
}>({
	data: null,
	isEditOpen: false,
	isDeleteOpen: false
});
