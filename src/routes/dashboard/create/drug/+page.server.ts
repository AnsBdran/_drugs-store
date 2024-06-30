import { superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { drugSchema } from './schema';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(drugSchema));
	return { form };
};
