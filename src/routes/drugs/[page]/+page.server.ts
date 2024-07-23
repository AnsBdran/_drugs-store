import prisma from '$lib/server/prisma';
import type {PageServerLoad} from './$types';

export const load: PageServerLoad = async ({params}) => {
    const page = Number(params.page);

    const getDrugs = async () => {
        const limit = 10;
        return prisma.drugItem.findMany({
            take: limit,
            skip: (page - 1) * limit,
            include: {
                drug: {
                    select: {
                        brandName: true,
                        manufacturer: true
                    }
                }
            },
        });

    };
    const getDrugsCount = async () => await prisma.drugItem.count();

    return {
        totalCount: await getDrugsCount(),
        drugItems: getDrugs(),
        categories: prisma.info.findFirst({
            select: {
                categories: true
            }
        })
        // info: prisma.info.findFirst()
    };
};
