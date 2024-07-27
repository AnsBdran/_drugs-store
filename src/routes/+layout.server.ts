import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	console.log('in layout server', locals);
	return {
		user: locals.user ? { ...locals.user } : null
	};
};
