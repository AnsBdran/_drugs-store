import prisma from '$lib/server/prisma';
import { superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { drugSchema } from '$lib/schemas/drug';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(drugSchema));

	const info = await prisma.info.findFirst();
	const manufacturers = await prisma.manufacturer.findMany();

	const drugs = await prisma.drug.findMany({
		include: {
			manufacturer: true,
			drugItems: true
		}
	});

	return { drugs, form, info, manufacturers };
};
