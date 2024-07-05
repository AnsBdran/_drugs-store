import { superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { drugSchema } from './schema';
import prisma from '$lib/server/prisma';
import { getValuesFromSelctObjects } from '$lib/utils';
// import { drugItemSchema } from '../drug-item/schema';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(drugSchema));
	try {
		return {
			form,
			indications: prisma.indication.findMany(),
			contraIndications: prisma.contraIndication.findMany(),
			manufacturers: prisma.manufacturer.findMany(),
			categories: prisma.category.findMany()
		};
	} catch (e) {
		console.log(e);
		return { form, indications: [], contraindications: [] };
	}
};
export const actions = {
	default: async (event) => {
		console.log('we are submitting');
		const form = await superValidate(event, zod(drugSchema));
		try {
			const result = await prisma.drug.create({
				data: {
					indicationIDs: getValuesFromSelctObjects(form.data.indications),
					contraIndicationIDs: getValuesFromSelctObjects(form.data.contraIndications),
					categoryIDs: getValuesFromSelctObjects(form.data.categoryIDs),
					name: { brand: form.data.name.brand, generic: form.data.name.generic },
					manufacturerID: form.data.manufacturerID
				}
			});
			console.log('new drug created', result);
			return { form };
		} catch (e) {
			console.log('Error while trying to create a new drug');
			console.log(form);
			return { form };
		}
	}
};
