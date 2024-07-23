import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		drugItems: prisma.drugItem.findMany({
			include: {
				drug: {
					select: {
						brandName: true
					}
				}
			}
		}),
		categories: prisma.info.findFirst({
			select: {
				categories: true
			}
		})
		// info: prisma.info.findFirst()
	};
};
