import { fail, message, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { requestSchema } from '$lib/schemas/request';
import prisma from '$lib/server/prisma';
import { uploadFileToCloudinary } from '$lib/server/utils';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(requestSchema));

	return { form };
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, zod(requestSchema));
		const { brandName, genericName, description, image, strength } = form.data;
		let imageLink = '';
		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			if (image) {
				const uploadResult = await uploadFileToCloudinary(image);
				imageLink = uploadResult.secure_url;
			}
			const result = await prisma.request.create({
				data: {
					genericName: genericName ?? undefined,
					brandName: brandName ?? undefined,
					description: description ?? undefined,
					strength: strength ?? undefined,
					imageURL: imageLink ?? undefined,
					userID: locals.user?.id as string
				}
			});
			console.log(result);
			return message(form, {
				type: 'success',
				text: 'Your request has been successfully submitted '
			});
		} catch (error) {
			console.error(error);
			return fail(400, { form });
		}
	}
};
