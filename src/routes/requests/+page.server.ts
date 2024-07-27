import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		requests: prisma.request.findMany({
			where: {
				responseStatus: 'accepted'
			}
		})
	};
};
