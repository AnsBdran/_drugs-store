import prisma from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// const images = await prisma.image.findMany()
	return {};
};

export const actions: Actions = {
	default: async ({ request }) => {
		console.log('we began');
		const formData = await request.formData();
		const data: App.CLOUDINARY_Asset = JSON.parse(formData.get('info') as string);
		try {
			const result = await prisma.image.create({
				data: {
					height: data.height,
					width: data.width,
					publicID: data.public_id,
					secureURL: data.secure_url,
					url: data.url,
					assetID: data.asset_id,
					bytes: data.bytes,
					format: data.format,
					path: data.path,
					signature: data.signature
				}
			});
			console.log('result', result);
			return { data: result };
		} catch (e) {
			console.log(e);
		}
	}
};
