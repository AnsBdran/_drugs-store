import { writable } from 'svelte/store';

const createDimensionsStore = () => {
	// const { set, subscribe } = writable({ width: 150, height: 150 });
	const store = writable({ width: 150, height: 150 });
	const updateDimensions = () => {
		if (window.innerWidth > 900) {
			store.set({ width: 250, height: 350 });
		} else {
			store.set({ width: 150, height: 150 });
		}
	};

	const initialize = () => {
		updateDimensions();
		window.addEventListener('resize', updateDimensions);
		return () => window.removeEventListener('resize', updateDimensions);
	};
	return { store, initialize };
};

export const dimensions = createDimensionsStore();
