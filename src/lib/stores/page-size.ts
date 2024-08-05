import { readable, writable } from 'svelte/store';

export const pageSize = writable({
	count: 5
});
