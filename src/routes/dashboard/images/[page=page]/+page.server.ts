import prisma from '$lib/server/prisma';
import { getPagination } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { limit, page, skip } = getPagination(params.page);
	const images = await prisma.image.findMany({
		include: {
			drugItem: true
		},
		take: limit,
		skip
	});
	return { images, page };
};
