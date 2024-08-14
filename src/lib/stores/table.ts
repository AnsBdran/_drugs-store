import type { Drug } from '$lib/types';
import type { DrugItem, Manufacturer, Request, User } from '@prisma/client';
import { writable } from 'svelte/store';

export const rowChanges = writable<{
	data: Manufacturer | DrugItem | Request | User | Drug | null;
	isEditOpen: boolean;
	isDeleteOpen: boolean;
}>({
	data: null,
	isEditOpen: false,
	isDeleteOpen: false
});
