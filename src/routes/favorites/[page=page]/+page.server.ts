import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';
import { getPagination } from '$lib/utils';

export const load: PageServerLoad = async ({ locals, params }) => {
	const user = locals.user;
	console.log('|||||||||||||||||||||||||||||||||');
	console.log('favorites load raaaaaaan');
	if (!user) {
		return redirect(302, '/auth');
	}

	const { limit, page, skip } = getPagination(params.page);
	try {
		const result = await prisma.user.findUnique({
			where: { id: user.id },
			include: {
				likedDrugItems: {
					select: {
						drugItem: {
							include: {
								drug: true,
								likedBy: true
							}
						}
					},
					skip,
					take: limit
				},
				_count: true
			}
		});
		// console.log('liked', result?.likedDrugItems);
		return {
			favorites: result?.likedDrugItems.map((i) => ({ ...i.drugItem })),
			count: result?._count.likedDrugItems,
			page,
			limit
		};
	} catch (e) {
		console.error(e);
		return fail(404);
	}
};
