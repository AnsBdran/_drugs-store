import type { Drug } from '$lib/types';
import type { DrugItem, Manufacturer, Request, User } from '@prisma/client';
import { writable } from 'svelte/store';

type RowEditType = {
	// type RowEditType<T> = {
	// data: Manufacturer | DrugItem | Request | User | Drug | undefined;
	data: any | undefined;
	isEditOpen: boolean;
	isDeleteOpen: boolean;
	// data: T | undefined;
};

// export const createRowEditStore = <T>() => {
// 	return {
// 		editRowStore: writable<RowEditType<T>>({
// 			data: undefined,
// 			isDeleteOpen: false,
// 			isEditOpen: false
// 		})
// 	};
// };
export const rowEditStore = writable<RowEditType>({
	// export const createRowEditStore = writable<RowEditType>({
	data: undefined,
	isDeleteOpen: false,
	isEditOpen: false
});

// export const CreateRowEditStore = <T>() => {
// 	return writable<RowEditType<T>>({
// 		data: undefined,
// 		isDeleteOpen: false,
// 		isEditOpen: false
// 	});
// };

// export const rowChanges = writable<RowEditType>({
// 	data: null,
// 	isEditOpen: false,
// 	isDeleteOpen: false
// });
