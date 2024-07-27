import {
	fail,
	message,
	superValidate,
	type Infer,
	type SuperValidated
} from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { metadataSchema, type MetadataSchema } from '$lib/schemas/metdata';
import prisma from '$lib/server/prisma';
import type { contraIndications } from '$lib/info';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(metadataSchema));
	return { form };
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(metadataSchema));
		console.log('meta action called', form);
		if (!form.valid) {
			return fail(400, { form });
		}

		type DataKey = keyof typeof form.data;
		const keys = Object.keys(form.data) as DataKey[];
		try {
			const document = await prisma.info.findFirst();
			const updatedDocument = {
				categories: [...document.categories],
				contraIndications: [...document?.contraIndications],
				forms: [...document?.forms],
				indications: [...document?.indications],
				strengths: [...document?.strengths],
				activeIngredients: [...document?.activeIngredients]
			};
			console.log('trying =========', updatedDocument);
			keys.forEach((key) => {
				if (form.data[key] && form.data[key].length >= 1) {
					updatedDocument[key] = [...updatedDocument[key], ...form.data[key]];
				}
			});

			const updated = await prisma.info.update({
				where: {
					id: document?.id
				},
				data: updatedDocument
			});
			console.log(updated);
			return message(form, {
				type: 'success',
				text: 'Hola'
			});
		} catch (error) {
			return { form };
		}
	}
};
