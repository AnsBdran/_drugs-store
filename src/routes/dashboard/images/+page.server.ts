import prisma from '$lib/server/prisma';
import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { imageSchema } from '$lib/schemas/image';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(imageSchema));
	const images = prisma.image.findMany({
		take: 10,
		orderBy: {
			createdAt: 'desc'
		}
	});
	const drugItems = await prisma.drugItem.findMany({
		include: {
			drug: true
		}
	});

	return { images, form, drugItems };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const data: App.CLOUDINARY_Asset = JSON.parse(formData.get('info') as string);
		try {
			const result = await prisma.image.create({
				data: {
					height: data.height,
					width: data.width,
					publicID: data.public_id,
					// secureURL: data.secure_url,
					url: data.url
					// assetID: data.asset_id,
					// bytes: data.bytes,
					// format: data.format,
					// path: data.path,
					// signature: data.signature
				}
			});
			return { data: result };
		} catch (e) {
			console.log(e);
		}
	}
};
