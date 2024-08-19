import prisma from '$lib/server/prisma';
import { fail, message, superValidate } from 'sveltekit-superforms';
import type { PageServerLoad, Actions } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { requestEditSchema } from '$lib/schemas/request';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(requestEditSchema));

	return {
		form,
		requests: await prisma.request.findMany({
			include: {
				Author: true
			}
		})
	};
};

export const actions: Actions = {
	edit: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('_id');

		const form = await superValidate(formData, zod(requestEditSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const updated = await prisma.request.update({
				where: {
					id: id as string
				},
				data: { ...form.data, responseStatus: form.data.responseStatus }
			});
			return message(form, {
				type: 'success',
				text: `${updated.brandName} Request updated successfully.`
			});
		} catch (error) {
			console.error(error);
			return fail(400, { form });
		}
	},
	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('_id');

		try {
			const item = await prisma.request.delete({
				where: {
					id: id as string
				}
			});
			return { name: item.brandName };
		} catch (error) {
			console.error(error);
			return { success: false };
		}
	}
};
