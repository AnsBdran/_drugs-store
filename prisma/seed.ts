import {
	activeIngredients,
	contraIndications,
	drugCategories,
	// 	activeIngredients,
	// 	contraIndications,
	// 	drugCategories,
	drugForms,
	drugStrengths,
	indications
	// 	indications
} from '../src/lib/info';
import { Role, SIZE } from '@prisma/client';
import prisma from '../src/lib/server/prisma';
import { faker } from '@faker-js/faker';
// import { drugItems, manufacturers } from '../src/lib/mock-data';

// Before discovring arrayElement and arrayElements
// const getRandomItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
// // const getRandomItems = (arr: any[]) => Array.from({ length: Math.floor(Math.random() * 10) + 1 })

// const getRandomItems = (arr: any[]) => {
// 	let _ = [];
// 	for (let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
// 		console.log('getting random item for array || ', i);
// 		_.push(getRandomItem(arr));
// 	}
// 	return Array.from(new Set(_));
// };

// const manufacturer = () => ({
// 	city: faker.location.city(),
// 	country: faker.location.country(),
// 	description: faker.lorem.sentence(),
// 	url: faker.internet.url(),
// 	name: faker.company.name(),
// 	featured: faker.datatype.boolean()
// });

// const drug: Drug = () => ({
// 	brandName: faker.commerce.product(),
// 	categories: faker.da
// })

const units = ['unit', 'mg', 'g', 'l', 'ml'];

const seedInfo = async () => {
	const info = await prisma.info.findFirst();
	const updated = { ...info, strengths: drugStrengths };
	delete updated.id;
	await prisma.info.update({
		where: {
			id: info?.id
		},
		data: updated
	});
};
const seedDB = async () => {
	await prisma.drugItem.deleteMany();
	await prisma.drug.deleteMany();
	await prisma.likedDrugItem.deleteMany();
	await prisma.likedRequest.deleteMany();
	await prisma.request.deleteMany();
	await prisma.manufacturer.deleteMany();
	await prisma.image.deleteMany();
	await prisma.session.deleteMany();
	await prisma.user.deleteMany();

	console.log('done deleting');

	Array.from({ length: 500 }).forEach(async () => {
		const user = await prisma.user.create({
			data: {
				firstName: faker.person.firstName(),
				createdAt: faker.date.between({ from: '2023-10-07', to: '2024-08-13' }),
				lastName: faker.person.lastName(),
				email: faker.internet.email(),
				role: faker.helpers.arrayElement(['USER', 'ADMIN']) as Role,
				username: `${faker.person.firstName()}_${faker.person.lastName()}`,
				passwordHash: faker.internet.password(),
				id: faker.database.mongodbObjectId()
			}
		});

		const requestsLikesCount = faker.number.int({ min: 0, max: 100 });
		const request = await prisma.request.create({
			data: {
				createdAt: faker.date.between({ from: '2023-10-07', to: '2024-08-13' }),
				authorID: user.id,
				brandName: faker.commerce.productName(),
				description: faker.lorem.sentence(),
				genericName: faker.lorem.words({ min: 1, max: 3 }),
				strength: `${faker.number.int({ min: 100, max: 900 })}mg`,
				responseStatus: faker.helpers.arrayElement(['PENDING', 'ACCEPTED', 'REJECTED']),
				likes: requestsLikesCount,
				likedBy: {
					create: Array.from({ length: requestsLikesCount }).map(() => ({
						userID: faker.database.mongodbObjectId()
					}))
				}
			}
		});

		const drugItemLikesCount = faker.number.int({ min: 0, max: 500 });
		await prisma.drugItem.create({
			data: {
				form: drugForms[Math.floor(Math.random() * drugForms.length)],
				price: {
					batch: faker.number.int({ min: 3, max: 300 }),
					item: faker.number.int({ min: 3, max: 300 })
				},
				size: {
					amount: faker.number.int({ max: 200 }),
					unit: faker.helpers.arrayElement(units) as SIZE
				},
				activeIngredients: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }).map(
					(_, i) => ({
						name: faker.helpers.arrayElement(activeIngredients),
						strength: faker.helpers.arrayElement(drugStrengths)
					})
				),
				// activeIngredients: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }).map(
				// 	(_, i) => ({
				// 		name: faker.helpers.arrayElement(activeIngredients),
				// 		strength: {
				// 			amount: `${faker.number.int({ min: 20, max: 400 })}${faker.helpers.arrayElement(['mg', 'ml'])}`,
				// 			per: `${faker.number.int({ min: 100, max: 900 })}${faker.helpers.arrayElement(['unit', 'ml', 'g', 'l'])}`
				// 		}
				// 	})
				// ),
				available: faker.datatype.boolean({ probability: 0.7 }),
				discount: {
					batch: faker.number.int(),
					item: faker.number.int()
				},
				features: [faker.lorem.word(), faker.lorem.word()],
				featured: faker.datatype.boolean(),
				quantityInStock: {
					batches: Number(faker.number),
					items: Number(Number(faker.number))
				},
				notes: [faker.lorem.text(), faker.lorem.text()],

				// parent drug
				drug: {
					create: {
						brandName: faker.commerce.productName(),
						categories: faker.helpers.arrayElements(drugCategories.map((i) => i.name)),
						contraIndications: faker.helpers.arrayElements(contraIndications),
						indications: faker.helpers.arrayElements(indications),
						manufacturer: {
							// create manufacturer
							create: {
								city: faker.location.city(),
								country: faker.location.country(),
								name: faker.company.name(),
								featured: faker.datatype.boolean(),
								description: faker.lorem.sentence(),
								url: faker.internet.url()
							}
						},
						notes: [faker.lorem.words(), faker.lorem.words()],
						description: faker.lorem.paragraph()
					}
				},
				likedBy: {
					create: Array.from({ length: drugItemLikesCount }).map(() => ({
						userID: faker.database.mongodbObjectId()
					}))
				},
				description: faker.lorem.paragraphs(),
				likes: drugItemLikesCount,
				images: {
					create: Array.from({ length: Math.floor(Math.random() * 8 + 1) }).map((_, i) => ({
						height: faker.number.int({ min: 400, max: 1920 }),
						width: faker.number.int({ min: 400, max: 1920 }),
						publicID: faker.image.url(),
						url: faker.image.urlPicsumPhotos(),
						isPrimary: i === 0 ? true : false
						// isPrimary:  faker.datatype.boolean({ probability: 0.9 })
					}))
				}
			}
		});
	});
	console.log('database seed successfully');
};

// seedDB().then(() =>
seedDB().then(() =>
	console.log('|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||')
);

// } catch (error) {
// 	console.log('==> some error happened during seeding. <==\n', error);
// }
// }

// console.log(Array.from({ length: 50 }, manufacturer));

// create info record.
// ============================
// await prisma.info.create({
// 	data: {
// 		activeIngredients: Array.from(new Set(activeIngredients)),
// 		forms: Array.from(new Set(drugForms)),
// 		categories: Array.from(new Set(drugCategories)),
// 		indications: Array.from(new Set(indications)),
// 		contraIndications: Array.from(new Set(contraIndications))
// 	}

// });
