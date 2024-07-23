import { z } from 'zod';

const multiSelectSchema = z
	.array(
		z.object({
			value: z.string(),
			label: z.string(),
			disabled: z.boolean().optional()
		})
	)
	.min(1);
// .transform((arr) => arr.map((item) => item.value));

export const drugSchema = z.object({
	brandName: z.string().min(1),
	description: z.string(),
	indications: multiSelectSchema,
	contraIndications: multiSelectSchema,
	categories: multiSelectSchema,
	manufacturerID: z.string().min(1, 'You must choose a manufacturer')
});

// indications: z.array(z.string()).min(1),
// contraIndications: z.array(z.string()).min(1),
// categoryIDs: z.array(z.string()).min(1),
// activeIngredients: z
// 	.array(
// 		z.object({
// 			name: z.string().min(1),
// 			strength: z.object({
// 				amount: z.string(),
// 				per: z.string().default('unit')
// 			})
// 		})
// 	)
// 	.min(1)
// .default([{ name: '', strength: { amount: '', per: 'unit' } }])

export type DrugSchema = typeof drugSchema;
