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

export const actions = {
	like: async ({ request }) => {
		const formData = await request.formData();
		const requestID = formData.get('itemID') as string;
		const userID = formData.get('userID') as string;
		console.log('recived', { requestID, userID });
		let isLiked: boolean;
		try {
			const existingLike = await prisma.likedRequest.findUnique({
				where: {
					userID_requestID: {
						userID,
						requestID
					}
				}
			});
			let updatedRequest;
			if (existingLike) {
				await prisma.likedRequest.delete({
					where: {
						userID_requestID: {
							userID,
							requestID
						}
					}
				});
				updatedRequest = await prisma.request.update({
					where: { id: requestID },
					data: {
						likes: { decrement: 1 }
					}
				});
				isLiked = false;
			} else {
				await prisma.likedRequest.create({
					data: {
						userID,
						requestID
					}
				});
				updatedRequest = await prisma.request.update({
					where: {
						id: requestID
					},
					data: {
						likes: { increment: 1 }
					}
				});
				isLiked = true;
			}
			return { likesCount: updatedRequest.likes, isLikedByUser: isLiked };
		} catch (error) {
			console.error(error);
			return fail(400);
		}
	}
} satisfies Actions;
