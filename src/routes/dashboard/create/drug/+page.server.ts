import { superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { drugSchema } from '$lib/schemas/drug';
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
		const form = await superValidate(event, zod(drugSchema));
		const { brandName, categories, contraIndications, description, indications, manufacturerID } =
			form.data;
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
		} catch (e) {
			console.log(e);
		}
		return { form };
	}
};
