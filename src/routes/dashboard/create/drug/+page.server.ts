import { superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { drugSchema } from './schema';
import prisma from '$lib/server/prisma';
import { parseSelectItems } from '$lib/utils';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(drugSchema));
	return {
		form,
		info: prisma.info.findFirst(),
		manufacturers: prisma.manufacturer.findMany()
	};
};
export const actions = {
	default: async (event) => {
		console.log('we are submitting');
		const form = await superValidate(event, zod(drugSchema));
		const { brandName, categories, contraIndications, description, indications, manufacturerID } =
			form.data;
		// console.log(...drugSchema.safeParse(form.data));
		try {
			const result = await prisma.drug.create({
				data: {
					brandName,
					categories: parseSelectItems(categories),
					indications: parseSelectItems(indications),
					contraIndications: parseSelectItems(contraIndications),
					manufacturerID
				}
			});
			console.log('new recored created');
			console.log(result);
		} catch (e) {
			console.log('error while trying to create a new drug record.');
			console.log(e);
		}
		return { form };
	}
};
