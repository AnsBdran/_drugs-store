import prisma from '$lib/server/prisma';
import { json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	let model: 'drug' | 'request' = 'drug';

	const { itemID, userID, modelType } = await request.json();
	let isLiked: boolean;
	let updatedDrugItem;
	if (modelType) {
		model = modelType;
	}

	if (model === 'drug') {
		try {
			const existingLike = await prisma.likedDrugItem.findUnique({
				where: {
					userID_drugItemID: {
						userID,
						drugItemID: itemID
					}
				}
			});

			if (existingLike) {
				await prisma.likedDrugItem.delete({
					where: {
						userID_drugItemID: {
							userID,
							drugItemID: itemID
						}
					}
				});

				updatedDrugItem = await prisma.drugItem.update({
					where: { id: itemID },
					data: {
						likes: { decrement: 1 }
					}
				});
				isLiked = false;
			} else {
				await prisma.likedDrugItem.create({
					data: {
						userID,
						drugItemID: itemID
					}
				});

				updatedDrugItem = await prisma.drugItem.update({
					where: {
						id: itemID
					},
					data: {
						likes: {
							increment: 1
						}
					}
				});
				isLiked = true;
			}
			return json({
				likesCount: updatedDrugItem.likes,
				isLikedByUser: isLiked
			});
		} catch (error) {
			console.error(error);
			return json({ error: 400 });
		}
	} else {
		try {
			const existingLike = await prisma.likedRequest.findUnique({
				where: {
					userID_requestID: {
						userID,
						requestID: itemID
					}
				}
			});

			if (existingLike) {
				await prisma.likedRequest.delete({
					where: {
						userID_requestID: {
							userID,
							requestID: itemID
						}
					}
				});

				updatedDrugItem = await prisma.request.update({
					where: { id: itemID },
					data: {
						likes: { decrement: 1 }
					}
				});
				isLiked = false;
			} else {
				await prisma.likedRequest.create({
					data: {
						userID,
						requestID: itemID
					}
				});

				updatedDrugItem = await prisma.request.update({
					where: {
						id: itemID
					},
					data: {
						likes: {
							increment: 1
						}
					}
				});
				isLiked = true;
			}
			return json({
				likesCount: updatedDrugItem.likes,
				isLikedByUser: isLiked
			});
		} catch (error) {
			console.error(error);
			return json({ error: 400 });
		}
	}
};
