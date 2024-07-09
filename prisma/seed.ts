import {
	contraIndications,
	dosageInstructions,
	drugCategories,
	drugForms,
	drugStrengths,
	indications
} from '../src/lib/info';
import prisma from '../src/lib/server/prisma';
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
		await prisma.dosageInstruction.createMany({
			data: dosageInstructions
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
