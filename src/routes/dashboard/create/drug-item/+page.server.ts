import { superValidate, fail, message } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { drugItemSchema } from '$lib/schemas/drug-item';
import prisma from '$lib/server/prisma';
import { uploadFileToCloudinary } from '$lib/server/utils';

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
		const form = await superValidate(event, zod(drugItemSchema));
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
			const result = await prisma.drugItem.create({
				data: {
					form: drugForm,
					price,
					// image: {
					// 	height: uploadResult.height,
					// 	width: uploadResult.width,
					// 	public_id: uploadResult.public_id,
					// 	secure_url: uploadResult.secure_url,
					// 	url: uploadResult.url
					// },
					description,
					drugID,
					activeIngredients,
					available,
					featured,
					size
				}
			});
			if (image) {
				const uploadResult = await uploadFileToCloudinary(image);
				await prisma.image.create({
					data: {
						// assetID: uploadResult.asset_id,
						// bytes: uploadResult.bytes,
						// format: uploadResult.format,
						height: uploadResult.height,
						width: uploadResult.width,
						// path: uploadResult.path,
						publicID: uploadResult.public_id,
						// secureURL: uploadResult.secure_url,
						// signature: uploadResult.signature,
						url: uploadResult.url,
						drugItemID: result.id,
						isPrimary: true
					}
				});
			}
			return message(form, {
				type: 'success',
				text: 'new drug item has been successfully created.'
			});
		} catch (e) {
			console.log(e);
			return fail(400, { form });
		}
	}
};
