import type { URL } from 'url';
import cloudinary from './cloudinary';
import { Prisma } from '@prisma/client';
import prisma from '$lib/server/prisma';
import { PRICES_RANGES } from '$lib/constants';
export const uploadFileToCloudinary = async (imageFile: File): Promise<App.CLOUDINARY_Asset> => {
	const arrayBuffer = await imageFile.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);

	return new Promise((resolve, reject) => {
		const uploadStream = cloudinary.uploader.upload_stream(
			{ resource_type: 'image', folder: 'drugs-store' },
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

export const getFilteredProducts = async ({
	url,
	limit,
	skip,
	category
}: {
	url: URL;
	limit: number;
	skip: number;
	category?: string;
}) => {
	const q = url.searchParams.get('q') || '';
	const sortBy = url.searchParams.get('sortBy') || '';
	const price = url.searchParams.get('price') || '';
	const order = url.searchParams.get('order') || '';
	const query: Prisma.DrugItemFindManyArgs = {
		take: limit,
		skip,
		include: {
			drug: {
				select: {
					brandName: true,
					manufacturer: true
				}
			},
			likedBy: true,
			images: true
		},
		where: {
			OR: [
				{
					drug: {
						brandName: {
							contains: q,
							mode: 'insensitive'
						},
						...(category && {
							categories: {
								has: category
							}
						})
					}
				},
				{
					drug: {
						categories: {
							has: q
						}
					},
					form: {
						contains: q,
						mode: 'insensitive'
					}
				}
			],
			...(price === 'low' && {
				price: {
					is: {
						item: {
							lte: PRICES_RANGES.low.max,
							gt: PRICES_RANGES.low.min
						}
					}
				}
			}),
			...(price === 'mid' && {
				price: {
					is: {
						item: {
							gt: PRICES_RANGES.mid.min,
							lte: PRICES_RANGES.mid.max
						}
					}
				}
			}),
			...(price === 'high' && {
				price: {
					is: {
						item: {
							gt: PRICES_RANGES.high.min,
							lte: PRICES_RANGES.high.max
						}
					}
				}
			})
		},
		...(sortBy === 'favorites' && {
			orderBy: {
				likes: order === 'desc' ? 'desc' : 'asc'
			}
		}),
		...(sortBy === 'alphabetical' && {
			orderBy: {
				drug: {
					brandName: order === 'desc' ? 'desc' : 'asc'
				}
			}
		})
	};

	const [drugItems, count] = await prisma.$transaction([
		prisma.drugItem.findMany(query),
		prisma.drugItem.count({ where: query.where })
	]);
	return {
		count,
		data: drugItems,
		searchTerm: q
	};
};
