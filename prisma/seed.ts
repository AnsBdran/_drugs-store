import {
	indications,
	contraIndications,
	drugCategories,
	drugForms,
	drugDosages
} from '../src/lib/info';
import prisma from '../src/lib/server/prisma';

const seedDB = async () => {
	try {
		await prisma.category.createMany({
			data: drugCategories
		});
		console.log('Categories seeded');

		await Promise.all(
			indications.map(async (indication) => {
				await prisma.indication.create({
					data: {
						name: indication
					}
				});
			})
		);
		console.log('Indications seeded');

		await Promise.all(
			contraIndications.map(async (contra) => {
				await prisma.contraIndication.create({
					data: {
						name: contra
					}
				});
			})
		);
		console.log('ContraIndications seeded');

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
		console.log('DrugDosages seeded');

		await Promise.all(
			drugForms.map(async (form) => {
				await prisma.form.create({
					data: {
						name: form
					}
				});
			})
		);
		console.log('DrugForms seeded');
	} catch (e) {
		console.error('An error occurred while seeding the database:', e.message, e.stack);
		throw e;
	}
};

seedDB()
	.then(() => {
		console.log('Database seeded successfully');
	})
	.catch((e) => {
		console.error('Database seeding failed:', e);
	});

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
