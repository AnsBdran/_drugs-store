import prisma from '$lib/server/prisma';
import { message, superValidate } from 'sveltekit-superforms';
import type { PageServerLoad, Actions } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { fail } from '@sveltejs/kit';

const userEditSchema = z.object({
	role: z.enum(['USER', 'ADMIN', 'SUPER_ADMIN'])
});

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(userEditSchema));

	const users = await prisma.user.findMany({
		include: {
			_count: {
				select: {
					requests: true,
					likedDrugItems: true,
					likedRequests: true
				}
			}
		}
	});
	return { users, form };
};

export const actions = {
	edit: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('_id') as string;
		const form = await superValidate(formData, zod(userEditSchema));

		if (!form.valid) {
			return fail(400);
		}
		try {
			const user = await prisma.user.update({
				where: { id },
				data: {
					role: form.data.role
				}
			});
			console.log({ user });
			return message(form, {
				type: 'success',
				text: `User ${user.username} role updated successfully.`
			});
		} catch (error) {
			console.error(error);
		}
		console.log(form);
		return fail(400, { form });
	},
	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('_id') as string;
		console.log(formData);
		try {
			const user = await prisma.user.delete({
				where: {
					id
				}
			});

			const likedRequests = await prisma.likedRequest.findMany({
				where: { userID: user.id }
			});

			const likedDrugItems = await prisma.likedDrugItem.findMany({
				where: { userID: user.id }
			});

			if (likedRequests.length) {
				for (const likedRequest of likedRequests) {
					await prisma.request.update({
						where: { id: likedRequest.requestID },
						data: {
							likes: {
								decrement: 1
							}
						}
					});
				}
			}

			// Update likes count for drug items
			if (likedDrugItems.length) {
				for (const likedDrugItem of likedDrugItems) {
					await prisma.drugItem.update({
						where: { id: likedDrugItem.drugItemID },
						data: {
							likes: {
								decrement: 1
							}
						}
					});
				}
			}

			console.log('deleted', user);

			return { name: user.username };
		} catch (error) {
			console.error(error);
			return { sucess: false };
		}
	}
} satisfies Actions;
