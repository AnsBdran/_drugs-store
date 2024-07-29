import { superValidate, fail, message } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { drugItemSchema } from '$lib/schemas/drug-item';
import prisma from '$lib/server/prisma';
import { uploadFileToCloudinary } from '$lib/server/utils';
// import { parseSelectItems } from '$lib/utils';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(drugItemSchema));

	return {
		form,
		info: prisma.info.findFirst(),
		drugs: prisma.drug.findMany()
	};
};

export const actions: Actions = {
	default: async (event) => {
		console.log('form is submitting');
		const form = await superValidate(event, zod(drugItemSchema));
		console.log(form.data);
		if (!form.valid) {
			return fail(400, { form });
		}
		const {
			activeIngredients,
			available,
			drugID,
			image,
			featured,
			price,
			form: drugForm,
			description,
			size
		} = form.data;
		try {
			const uploadResult = await uploadFileToCloudinary(image);
			const result = await prisma.drugItem.create({
				data: {
					form: drugForm,
					price,
					imageURL: uploadResult.secure_url,
					description,
					drugID,
					activeIngredients,
					available,
					featured,
					size
				}
			});
			console.log('new record created', result);
			return message(form, {
				type: 'success',
				text: 'new drug item has been successfully created.'
			});
		} catch (e) {
			console.log('some error happened while trying to create a new drug item.');
			console.log(e);
			return fail(400, { form });
		}
	}
};
