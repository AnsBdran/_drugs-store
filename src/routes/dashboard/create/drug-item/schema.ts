// import type { ActiveIngredient } from '@prisma/client';
import { SIZE } from '@prisma/client';
import { z } from 'zod';

// export const units = ['mg', 'g', 'l', 'ml', 'unit'] as const;

export const drugItemSchema = z.object({
	drugID: z.string().min(1),
	price: z.object({
		item: z.coerce
			.number({ message: 'item price needed' })
			.positive('provide a number greater than 0')
			// .gt(0, 'The price must be greater than 0')
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
	image: z.instanceof(File, { message: 'please proivde a valid image' }),
	// .refine((f) => f.size < 3000_000, 'Max 3 MB Upload size. '),
	description: z.string().optional(),
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
	// .refine((data) => data.amount != 0, {
	// 	message: 'You must specify the total size.',
	// 	path: ['amount']
	// })
	// subImagesURL: z.string().url().array(),
	// quantityInStock: z.object({
	// 	unit: z.number().gt(0, 'must be greater than 0').optional(),
	// 	batch: z.number().gt(0, 'must be greater than 0').optional()
	// }),
	// likesCount: z.number().default(1),
	// strength: z.object({
	// 	amount: z.string(),
	// 	per: z.string()
	// }),
	// dosageInstructionsIDs: z.string().array(),
});
