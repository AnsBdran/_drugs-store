import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const createDimensionsStore = () => {
	// const { set, subscribe } = writable({ width: 150, height: 150 });
	// =====================================
	// TODO => if the screen is larger than 1024px at first page load, the width and height will be 150px
	const values = () => {
		if (browser) {
			if (window.innerWidth > 1024) {
				// if (window.innerWidth > 900) {
				return { width: 250, height: 350 };
			} else {
				return { width: 150, height: 150 };
			}
		} else {
			return { width: 150, height: 150 };
		}
	};
	const store = writable(values());
	const updateDimensions = () => {
		store.set(values());
	};

	const initialize = () => {
		updateDimensions();
		window.addEventListener('resize', updateDimensions);
		return () => window.removeEventListener('resize', updateDimensions);
	};
	return { store, initialize };
};

export const dimensions = createDimensionsStore();
