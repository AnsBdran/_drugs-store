import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		drugs: prisma.drug.findMany({
			include: {
				categories: true,
				contraIndications: true,
				indications: true,
				manufacturer: true
			}
		})
	};
};
