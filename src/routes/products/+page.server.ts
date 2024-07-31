import prisma from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		totalDrugs: prisma.drugItem.count(),
		totalBrands: prisma.manufacturer.count(),
		totalCategories: prisma.info.findFirst().then((res) => res?.categories.length)
	};
};
