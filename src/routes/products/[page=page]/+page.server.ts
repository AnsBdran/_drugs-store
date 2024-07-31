import prisma from '$lib/server/prisma';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const page = Number(params.page);
	const limit = 1;

	const getDrugs = async () => {
		const result = await prisma.drugItem.findMany({
			take: limit,
			skip: (page - 1) * limit,
			include: {
				drug: {
					select: {
						brandName: true,
						manufacturer: true
					}
				},
				likedBy: true
			}
		});
		return result;
	};

	if (!(page >= 0)) {
		redirect(307, '/products/1');
	}
	if ((await getDrugs()).length === 0) {
		error(404, {
			message: 'No products were found for this page.'
		});
	}

	return {
		pageSlug: page,
		pageSize: limit,
		drugItems: getDrugs(),
		totalCount: await prisma.drugItem.count(),
		categories: prisma.info.findFirst({
			select: {
				categories: true
			}
		})
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
