import { superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { drugSchema } from './schema';
import prisma from '$lib/server/prisma';
// import { makeSelectItems } from '$lib/server/utils';

export const load: PageServerLoad = async () => {
	// const form = await superValidate(zod(drugSchema));

	try {
		return {
			form: await superValidate(zod(drugSchema)),
			indications: await prisma.indication.findMany(),
			contraIndications: await prisma.contraIndication.findMany(),
			manufacturers: await prisma.manufacturer.findMany()
		};
	} catch (e) {
		console.log(e);
		return { form, indications: [], contraindications: [] };
	}
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(drugSchema));
		console.log(JSON.stringify(form, null, 2));
	}
};
