import prisma from '$lib/server/prisma.js';

export const load = async () => {
	const info = await prisma.info.findFirst({
		select: {
			settings: true
		}
	});
	if (!info?.settings) {
		await prisma.info.update({
			where: {
				id: '66b60807b08ac83045de8870'
			},
			data: {
				settings: {
					itemsPerPage: 5
				}
			}
		});
		return {
			settings: {
				itemsPerPage: 5
			}
		};
	}

	return {
		settings: info.settings
	};
};
