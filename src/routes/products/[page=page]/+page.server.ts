import prisma from '$lib/server/prisma';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const page = Number(params.page);

	const getDrugs = async () => {
		const limit = 10;
		const result = await prisma.drugItem.findMany({
			take: limit,
			skip: (page - 1) * limit,
			include: {
				drug: {
					select: {
						brandName: true,
						manufacturer: true
					}
				}
			}
		});
		return result;
	};

	if (!(page >= 0)) {
		redirect(307, '/products/1');
	}
	if ((await getDrugs()).length === 0) {
		error(404, {
			message: 'No products were found for this page.'
		});
	}
	return {
		totalCount: await prisma.drugItem.count(),
		drugItems: getDrugs(),
		categories: prisma.info.findFirst({
			select: {
				categories: true
			}
		}),
		pageSlug: page
	};
};
