import {
	indications,
	contraIndications,
	drugCategories,
	drugForms,
	drugDosages
} from '../src/lib/info';
import prisma from '../src/lib/server/prisma';

const seedDB = async () => {
	await prisma.category.createMany({
		data: drugCategories
	});

	await Promise.all(
		indications.map(async (indication) => {
			await prisma.indication.create({
				data: {
					name: indication
				}
			});
		})
	);

	await Promise.all(
		contraIndications.map(async (contra) => {
			await prisma.contraIndication.create({
				data: {
					name: contra
				}
			});
		})
	);

	await Promise.all(
		drugDosages.map(async (dosage) => {
			await prisma.drugStrength.create({
				data: {
					amount: dosage.amount,
					unit: dosage.unit,
					per: dosage.per,
					perUnit: dosage.perUnit
				}
			});
		})
	);

	await Promise.all(
		drugForms.map(async (form) => {
			await prisma.form.create({
				data: {
					name: form
				}
			});
		})
	);
};

// const seedDB = async () => {
// 	await prisma.category.createMany({
// 		data: drugCategories
// 	});
// 	await indications.map(async (indication) => {
// 		await prisma.indication.create({
// 			data: {
// 				name: indication
// 			}
// 		});
// 	});
// 	await contraIndications.map(async (contra) => {
// 		await prisma.contraIndication.create({
// 			data: {
// 				name: contra
// 			}
// 		});
// 	});
// 	await drugDosages.map(async (dosage) => {
// 		await prisma.drugStrength.create({
// 			data: {
// 				amount: dosage.amount,
// 				unit: dosage.unit
// 			}
// 		});
// 	});
// 	await drugForms.map(async (form) => {
// 		await prisma.form.create({
// 			data: {
// 				name: form
// 			}
// 		});
// 	});
// };

seedDB()
	.then(() => {
		console.log('database seed successfully');
	})
	.catch((e) => {
		console.log('something bad happens');
	});
