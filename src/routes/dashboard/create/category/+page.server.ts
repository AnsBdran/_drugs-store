import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { categorySchema } from '$lib/schemas/category';
import { uploadFileToCloudinary } from '$lib/server/utils';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(categorySchema));
	return {
		form
	};
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(categorySchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		try {
			const uploadResult = await uploadFileToCloudinary(form.data.image);
			const prismaResult = await prisma.category.create({
				data: {
					name: form.data.name,
					description: form.data.description,
					imageURL: uploadResult.secure_url
				}
			});
			console.log({ uploadResult, prismaResult });
			return message(form, 'category created successfully.');
		} catch (e) {
			console.error('======', e);
			return fail(400, { form });
		}
	}
};
