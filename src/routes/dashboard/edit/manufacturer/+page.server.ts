import prisma from '$lib/server/prisma';
import { fail, message, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { manufacturerSchema } from '$lib/schemas/manufacturer';

export const load: PageServerLoad = async ({ depends }) => {
	depends('data:manufacturer');
	const form = await superValidate(zod(manufacturerSchema));
	return {
		form,
		manufacturers: await prisma.manufacturer.findMany()
	};
};

export const actions: Actions = {
	edit: async ({ request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(manufacturerSchema));
		const id = formData.get('_id') as string;

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const result = await prisma.manufacturer.update({
				data: form.data,
				where: {
					id
				}
			});
			return message(form, {
				type: 'success',
				text: `${result.name} has been updated successfully.`
			});
		} catch (error) {
			return { form };
		}
	},
	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('_id') as string;

		try {
			const result = await prisma.manufacturer.delete({
				where: {
					id
				}
			});
			return { name: result.name };
		} catch (error) {
			return { success: false };
		}
	}
};
