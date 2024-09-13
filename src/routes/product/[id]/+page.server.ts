import prisma from '$lib/server/prisma.js';

import { error, fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load = async ({ params }) => {
	const { id } = params;
	const product = await prisma.drugItem.findUnique({
		where: { id },
		include: {
			drug: true,
			likedBy: true,
			images: true
		}
	});

	if (!product) {
		return error(404, {
			message: 'Product not found'
		});
	}
	return {
		label: product?.drug.brandName,
		product
	};
};

export const actions = {
	like: async ({ request }) => {
		const formData = await request.formData();
		const drugItemID = formData.get('itemID') as string;
		const userID = formData.get('userID') as string;

		let isLiked: boolean;
		let updatedDrugItem;

		try {
			const existingLike = await prisma.likedDrugItem.findUnique({
				where: {
					userID_drugItemID: {
						userID,
						drugItemID
					}
				}
			});

			if (existingLike) {
				await prisma.likedDrugItem.delete({
					where: {
						userID_drugItemID: {
							userID,
							drugItemID
						}
					}
				});

				updatedDrugItem = await prisma.drugItem.update({
					where: { id: drugItemID },
					data: {
						likes: { decrement: 1 }
					}
				});
				isLiked = false;
			} else {
				await prisma.likedDrugItem.create({
					data: {
						userID,
						drugItemID
					}
				});

				updatedDrugItem = await prisma.drugItem.update({
					where: {
						id: drugItemID
					},
					data: {
						likes: {
							increment: 1
						}
					}
				});
				isLiked = true;
			}
			return {
				likesCount: updatedDrugItem.likes,
				isLikedByUser: isLiked
			};
		} catch (error) {
			console.error(error);
			return fail(400);
		}
	}
} satisfies Actions;
