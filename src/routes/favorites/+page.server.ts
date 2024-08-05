import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user;

	if (!user) {
		return redirect(302, '/auth');
	}
	try {
		return {
			count: prisma.likedDrugItem.count({
				where: {
					userID: user.id
				}
			})
		};
	} catch (e) {
		console.error(e);
		return fail(404);
	}
};
