import prisma from '$lib/server/prisma';
import { message, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { drugSchema } from '$lib/schemas/drug';
import { parseSelectItems } from '$lib/utils';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(drugSchema));

	const info = await prisma.info.findFirst();
	const manufacturers = await prisma.manufacturer.findMany();

	const drugs = await prisma.drug.findMany({
		include: {
			manufacturer: true,
			drugItems: true
		}
	});

	return { drugs, form, info, manufacturers };
};

export const actions: Actions = {
	edit: async ({ request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(drugSchema));
		const { brandName, categories, contraIndications, description, indications, manufacturerID } =
			form.data;
		const id = formData.get('_id') as string;
		console.log('id ', id, form.valid, form.data);
		try {
			await prisma.drug.update({
				where: { id },
				data: {
					brandName,
					categories: parseSelectItems(categories),
					indications: parseSelectItems(indications),
					contraIndications: parseSelectItems(contraIndications),
					description,
					manufacturerID
				}
			});
			return message(form, { type: 'success', text: 'Drug has been updated Successfully.' });
		} catch (error) {
			console.log('error ', error);
		}
	}
};
