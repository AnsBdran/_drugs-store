import prisma from '$lib/server/prisma';
import { getPagination } from '$lib/utils';
import type { Prisma } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { limit, page, skip } = getPagination(params.page);

	const query: Prisma.RequestFindManyArgs = {
		take: limit,
		skip,
		include: {
			Author: true
		},
		orderBy: {
			createdAt: 'desc'
		}
	};
	const promise = prisma.$transaction([prisma.request.findMany(query), prisma.request.count()]);

	return {
		promise,
		page
	};
};
