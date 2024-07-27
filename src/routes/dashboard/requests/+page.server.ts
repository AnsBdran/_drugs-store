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
				User: true
			}
		})
	};
};

export const actions: Actions = {
	edit: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('_id');

		const form = await superValidate(formData, zod(requestEditSchema));
		console.log('recieved', form);

		if (!form.valid) {
			console.log('the form is not valid');
			return fail(400, { form });
		}

		try {
			const updated = await prisma.request.update({
				where: {
					id: id as string
				},
				data: { ...form.data, responseStatus: form.data.responseStatus }
			});
			console.log('updated', updated);
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
