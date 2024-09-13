import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) redirect(302, '/auth');
	const usersCount = prisma.user.count();
	const productsCount = prisma.drugItem.count();
	const likedProducts = prisma.likedDrugItem.count();
	const likedRequests = prisma.likedRequest.count();
	const requestsCount = prisma.request.count();
	const brandsCount = prisma.manufacturer.count();

	return {
		username: locals.user.username,
		usersCount,
		productsCount,
		likedProducts,
		likedRequests,
		requestsCount,
		brandsCount
	};
};
