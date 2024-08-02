import prisma from '$lib/server/prisma';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	return {
		requests: prisma.request.findMany({
			where: {
				responseStatus: 'accepted'
			},
			include: {
				Author: true,
				likedBy: true
			}
		})
	};
};
