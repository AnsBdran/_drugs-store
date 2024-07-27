import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
	errorFormat: 'pretty'
});

// prisma.$use
export default prisma;
