import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const pageSize = 5;
	const { category, page } = params;
	const pageNumber = Number(params.page);
	const products = await prisma.drugItem.findMany({
		where: {
			drug: {
				categories: {
					has: category
				}
			}
		},
		include: {
			drug: true,
			likedBy: true
		},
		skip: (page - 1) * pageSize,
		take: pageSize
	});
	console.log('found ', products.length, ' products.');
	return {
		products,
		pageSize,
		category,
		pageNumber,
		totalCount: await prisma.drugItem.count({
			where: {
				drug: {
					categories: {
						has: category
					}
				}
			}
		})
	};
};
