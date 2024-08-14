import type { PageServerLoad } from './$types';
import { getPagination } from '$lib/utils';
import { getFilteredProducts } from '$lib/server/utils';

export const load: PageServerLoad = async ({ params, url }) => {
	const { limit, page, skip } = getPagination(params.page);

	// const { count, data, searchTerm } = await getFilteredProducts({ url, limit, skip });
	const _data = getFilteredProducts({ url, limit, skip });
	return {
		pageSlug: page,
		pageSize: limit,
		_data
	};
};
