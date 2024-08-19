import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { manufacturerSchema } from '$lib/schemas/manufacturer';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(manufacturerSchema));
	return { form };
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(manufacturerSchema));
		if (!form.valid) return fail(400, form);
		try {
			const prismaResult = await prisma.manufacturer.create({ data: form.data });
			return message(form, {
				type: 'success',
				text: `New manufacturer ${prismaResult.name} added successfully.`
			});
		} catch (e) {
			return { form };
		}
	}
};
