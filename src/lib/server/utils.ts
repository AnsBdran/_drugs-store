import cloudinary from './cloudinary';
import type { Image } from '@prisma/client';

export const uploadFileToCloudinary = async (imageFile: File): Promise<Image> => {
	const arrayBuffer = await imageFile.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);

	return new Promise((resolve, reject) => {
		const uploadStream = cloudinary.uploader.upload_stream(
			{ resource_type: 'image' },
			(error, result) => {
				if (error) {
					console.error('error in uploading to cloudinary', error);
					return reject(error);
				}
				resolve(result);
			}
		);
		uploadStream.end(buffer);
	});
};

export const makeSelectItems = (items) =>
	items.map((item) => ({
		value: item.id,
		label: item.name
	}));
