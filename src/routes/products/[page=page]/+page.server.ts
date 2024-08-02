import prisma from '$lib/server/prisma';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const page = Number(params.page);
	const limit = 1;

	const getDrugs = async () => {
		const result = await prisma.drugItem.findMany({
			take: limit,
			skip: (page - 1) * limit,
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
