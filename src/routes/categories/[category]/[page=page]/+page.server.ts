import { getFilteredProducts } from '$lib/server/utils';
import { getPagination } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url }) => {
	const { limit, page, skip } = getPagination(params.page);
	const { category } = params;

	const { count, data, searchTerm } = await getFilteredProducts({ category, limit, skip, url });
	return {
		products: data,
		count,
		searchTerm,
		category,
		pageNumber: page
	};
};
