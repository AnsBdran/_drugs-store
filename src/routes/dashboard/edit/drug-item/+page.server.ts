import prisma from '$lib/server/prisma';
import { fail, message, superValidate } from 'sveltekit-superforms';
import type { PageServerLoad, Actions } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { drugItemSchema } from '$lib/schemas/drug-item';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(drugItemSchema));
	return {
		form,
		drugItems: await prisma.drugItem.findMany({
			include: {
				drug: true
			}
		}),
		info: prisma.info.findFirst(),
		drugs: prisma.drug.findMany()
	};
};

export const actions: Actions = {
	edit: async ({ request }) => {
		console.log('edit drug item action is here');
		const formData = await request.formData();
		const id = formData.get('_id');
		const form = await superValidate(formData, zod(drugItemSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const result = await prisma.drugItem.update({
				data: {
					...form.data
				},
				where: {
					id: id as string
				}
			});
			return message(form, { type: 'success', text: `Drug item has been updated successfully.` });
		} catch (error) {
			console.error(error);
			return { form };
		}
	},
	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('_id') as string;

		try {
			await prisma.likedDrugItem.deleteMany({
				where: {
					drugItemID: id
				}
			});
			const result = await prisma.drugItem.delete({
				where: {
					id
				},
				select: {
					drug: {
						select: {
							brandName: true
						}
					}
				}
			});
			return { name: result.drug.brandName };
		} catch (error) {
			console.error(error);
			return { success: false };
		}
	}
};
