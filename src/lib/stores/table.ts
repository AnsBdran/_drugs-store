import type { DrugItem, Manufacturer, Request } from '@prisma/client';
import { writable } from 'svelte/store';

export const rowChanges = writable<{
	data: Manufacturer | DrugItem | Request | null;
	isEditOpen: boolean;
	isDeleteOpen: boolean;
}>({
	data: null,
	isEditOpen: false,
	isDeleteOpen: false
});
