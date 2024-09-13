import { z } from 'zod';

export const drugItemSchema = z.object({
	drugID: z.string().min(1),
	image: z
		.instanceof(File, { message: 'please proivde a valid image' })
		.refine((f) => f.size < 2000_000, 'Max 2 MB Upload size. ')
		.nullable(),
	price: z.object({
		item: z.coerce
			.number({ message: 'item price needed' })
			.positive('provide a number greater than 0')
			.default('' as unknown as number),
		batch: z.coerce
			.number({ message: 'batch price must be a number.' })
			.gt(0, 'The price must be greater than 0')
			.default('' as unknown as number)
	}),
	activeIngredients: z
		.array(
			z.object({
				name: z.string().min(1),
				strength: z
					.object({
						amount: z.string(),
						per: z.string().default('unit')
					})
					.refine((data) => data.amount !== '', {
						message: 'Strength must be provided.',
						path: []
					})
			})
		)
		.min(1)
		.default([{ name: '', strength: { amount: '', per: 'unit' } }]),
	description: z.string().nullable(),
	available: z.boolean().default(true),
	form: z.string().min(1, 'You must specify the drug form.'),
	featured: z.boolean().default(false),
	size: z.object({
		amount: z.coerce
			.number({ message: 'You must specify the drug total size.' })
			.positive('You must specify a number greater than 0')
			.default('' as unknown as number),
		unit: z.enum(['mg', 'g', 'l', 'ml', 'unit']).default('unit')
	})
});

export type DrugItemSchema = typeof drugItemSchema;
