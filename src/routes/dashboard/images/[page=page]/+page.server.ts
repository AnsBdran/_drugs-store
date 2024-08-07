import prisma from '$lib/server/prisma';
import { getPagination } from '$lib/utils';
import { fail, message, superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { imageSchema } from '$lib/schemas/image';

export const load: PageServerLoad = async ({ params }) => {
	const form = await superValidate(zod(imageSchema));

	const { limit, page, skip } = getPagination(params.page);
	const images = await prisma.image.findMany({
		include: {
			drugItem: {
				include: {
					drug: true
				}
			}
		},
		take: limit,
		skip
	});

	const drugItems = await prisma.drugItem.findMany({
		include: {
			drug: true
		}
	});
	return { images, page, drugItems, form };
};

export const actions = {
	edit: async ({ request }) => {
		console.log('action called');
		const form = await superValidate(request, zod(imageSchema));
		console.log('form', form);
		const { drugItemID, imageID, isPrimary } = form.data;

		if (!form.valid) {
			return fail(404, { form });
		}
		try {
			const result = await prisma.image.update({
				where: {
					id: imageID
				},
				data: {
					drugItemID
				}
			});
			console.log('update result', result);
			return message(form, { text: 'Image link updated successfully', type: 'success' });
		} catch (error) {
			console.error(error);
			return fail(400, { form });
		}
	},
	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('imageID') as string;
		try {
			await prisma.image.delete({
				where: {
					id
				}
			});
			return 'Image deleted successfully.';
		} catch (e) {
			console.log(e);
			return fail(400);
		}
	}
};
