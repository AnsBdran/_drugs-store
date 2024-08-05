import prisma from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getPagination } from '$lib/utils';

export const load: PageServerLoad = async ({ params }) => {
	const { limit, page, skip } = getPagination(params.page);

	const getDrugs = async () => {
		const result = await prisma.drugItem.findMany({
			take: limit,
			skip,
			include: {
				drug: {
					select: {
						brandName: true,
						manufacturer: true
					}
				},
				likedBy: true
			}
		});
		return result;
	};

	// if (!(page >= 0)) {
	// 	redirect(307, '/products/1');
	// }
	if ((await getDrugs()).length === 0) {
		error(404, {
			message: 'No products were found for this page.'
		});
	}

	return {
		pageSlug: page,
		pageSize: limit,
		drugItems: getDrugs(),
		totalCount: await prisma.drugItem.count(),
		categories: prisma.info.findFirst({
			select: {
				categories: true
			}
		})
	};
};
