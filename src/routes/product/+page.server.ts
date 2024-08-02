import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async () => {
	const products = await prisma.drugItem.findMany({
		include: {
			drug: true
		}
	});
	return {
		links: products.map((p) => ({
			href: `/product/${p.id}`,
			label: p.drug.brandName
		}))
	};
};
