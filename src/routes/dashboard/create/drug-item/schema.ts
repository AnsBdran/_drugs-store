import { z } from 'zod';

const units = ['mg', 'g', 'l', 'ml', 'unit'] as const;

export const drugItemSchema = z.object({
	drugID: z.string().min(1),
	imageURL: z.string().url(),
	subImagesURL: z.string().url().array(),
	price: z.number().min(1),
	quantityInStock: z.object({
		batches: z.number().optional(),
		items: z.number().optional()
	}),
	description: z.string().optional(),
	likesCount: z.number().default(1),
	available: z.boolean().default(true),
	strength: z.object({
		amount: z.number(),
		unit: z.enum(units).default('mg'),
		per: z.number().default(1),
		perUnit: z.enum(units).default('unit')
	}),
	formID: z.string(),
	dosageInstructionsIDs: z.string().array(),
	featured: z.boolean().default(false)
});
