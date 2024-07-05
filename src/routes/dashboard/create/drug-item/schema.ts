import { z } from 'zod';

// export const units = ['mg', 'g', 'l', 'ml', 'unit'] as const;

export const drugItemSchema = z.object({
	drugID: z.string().min(1),
	image: z.instanceof(File),
	subImagesURL: z.string().url().array(),
	price: z.object({
		unit: z.number().gt(0, 'The price must be greater than 0').default(0),
		batch: z.number().gt(0, 'The price must be greater than 0').default(0)
	}),
	quantityInStock: z.object({
		unit: z.number().gt(0, 'must be greater than 0').optional(),
		batch: z.number().gt(0, 'must be greater than 0').optional()
	}),
	description: z.string().optional(),
	likesCount: z.number().default(1),
	available: z.boolean().default(true),
	strengthID: z.string(),
	formID: z.string(),
	dosageInstructionsIDs: z.string().array(),
	featured: z.boolean().default(false)
});
