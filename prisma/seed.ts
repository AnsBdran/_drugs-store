import {
	contraIndications,
	dosageInstructions,
	drugCategories,
	drugForms,
	drugStrengths,
	indications
} from '../src/lib/info';
import prisma from '../src/lib/server/prisma';
import { drugItems, manufacturers } from '../src/lib/mock-data';
const seedDB = async () => {
	try {
		// await prisma.info.create({
		// 	data: {
		// 		categories: drugCategories,
		// 		contraIndications,
		// 		indications,
		// 		strengths: drugStrengths,
		// 		forms: drugForms
		// 	}
		// });
		// await prisma.dosageInstruction.createMany({
		// 	data: dosageInstructions
		// });
		// await prisma.drugItem.createMany({
		// 	data: drugItems
		// });
		await prisma.manufacturer.createMany({
			data: manufacturers
		});
		console.log('database seed successfully');
	} catch (error) {
		console.log('==> some error happened during seeding. <==\n', error);
	}
};

seedDB();
// .then(() => {
// 	console.log('database seed successfully');
// })
// .catch(() => {
// 	console.log('some error happened during seeding.');
// });
