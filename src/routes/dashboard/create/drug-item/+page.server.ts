import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { drugItemSchema } from './schema';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(drugItemSchema));
	// const strengths = await prisma.drugStrength.findMany();
	// console.log('.....', strengths);
	// const drugs = await prisma.drug.findMany();
	return {
		form,
		drugs: prisma.drug.findMany(),
		strengths: prisma.drugStrength.findMany(),
		forms: prisma.form.findMany()
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = superValidate(event, zod(drugItemSchema));
		console.log(form);
	}
};
