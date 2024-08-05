import prisma from '$lib/server/prisma';
import { fail, message, superValidate } from 'sveltekit-superforms';
import type { PageServerLoad, Actions } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { drugItemSchema } from '$lib/schemas/drug-item';
import { uploadFileToCloudinary } from '$lib/server/utils';

const durgItemEditSchema = drugItemSchema.extend({
	image: drugItemSchema.shape.image.optional()
});

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(durgItemEditSchema));
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
		const formData = await request.formData();
		const id = formData.get('_id');
		const form = await superValidate(formData, zod(durgItemEditSchema));
		console.log('edit action called', form);
		let uploadResult;
		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			if (form.data.image) {
				uploadResult = await uploadFileToCloudinary(form.data.image);
			}
			const result = await prisma.drugItem.update({
				data: {
					...form.data,
					imageURL: uploadResult?.secure_url
				},
				where: {
					id: id as string
				}
			});
			console.log({ result });
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
