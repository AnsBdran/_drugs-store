import { ITEMS_PER_PAGE } from '$lib/constants';
import prisma from '$lib/server/prisma';

export const load = async () => {
	return {
		requests: prisma.request.findMany({
			where: {
				responseStatus: 'ACCEPTED'
			},
			include: {
				Author: true,
				likedBy: true
			},
			take: ITEMS_PER_PAGE,
			orderBy: {
				createdAt: 'desc'
			}
		})
	};
};
