import { fail, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { metadataSchema } from '$lib/schemas/metdata';

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
		return { form };
	}
};
