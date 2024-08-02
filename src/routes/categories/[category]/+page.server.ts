import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	return {
		count: prisma.drugItem.count({
			where: {
				drug: {
					categories: {
						has: params.category
					}
				}
			}
		}),

		topProducts: await prisma.drugItem.findMany({
			where: {
				drug: {
					categories: {
						has: params.category
					}
				}
			},
			include: {
				drug: true,
				likedBy: true
			},
			orderBy: {
				likes: 'desc'
			},
			take: 10
		})
	};
};
