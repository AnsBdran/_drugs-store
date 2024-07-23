import prisma from '$lib/server/prisma';
import { fail, message, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { manufacturerSchema } from '$lib/schemas/manufacturer';

export const load: PageServerLoad = async ({ depends }) => {
	console.log('manufacturer server load ran.');
	depends('data:manufacturer');
	const form = await superValidate(zod(manufacturerSchema));
	return {
		form,
		manufacturers: await prisma.manufacturer.findMany()
	};
};

export const actions: Actions = {
	edit: async ({ request }) => {
		console.log('form is submitting');
		const formData = await request.formData();
		const form = await superValidate(formData, zod(manufacturerSchema));
		const id = formData.get('_id') as string;

		if (!form.valid) {
			console.log('form is invalid', form);
			return fail(400, { form });
		}

		try {
			console.log('trying');
			const result = await prisma.manufacturer.update({
				data: form.data,
				where: {
					id
				}
			});
			console.log('prisma said', result);
			return message(form, {
				type: 'success',
				text: `${result.name} has been updated successfully.`
			});
		} catch (error) {
			console.log(error);
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
			console.log('delete result', result);
			return { name: result.name };
		} catch (error) {
			console.log(error);
			return { success: false };
		}
	}
};
