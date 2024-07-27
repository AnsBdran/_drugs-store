import { z } from 'zod';

// schemas
export const indicationsSchema = z
	.array(z.string().min(1))
	.default([])
	// .default([''] as unknown as string[])
	.optional();

export const contraIndicationsSchema = z
	.array(z.string().min(1))
	// .default([''] as unknown as string[])
	.default([])
	.optional();

export const activeIngredientsSchema = z
	.array(z.string().min(1))
	// .default([''] as unknown as string[])
	.default([])
	.optional();

export const formsSchema = z
	.array(z.string().min(1))
	// .default([''] as unknown as string[])
	.default([])
	.optional();

export const categoriesSchema = z
	.array(z.string().min(1))
	.default([])
	// .default([''] as unknown as string[])
	.optional();

export const strengthsSchema = z
	.array(
		z.object({
			amount: z.string().min(1),
			per: z.string().min(1)
		})
	)
	.default([])
	.optional();
// .default([{ amount: '', per: '' }]);

// const metadataSchemaFields: keyof typeof metadataSchema =

const _metadataSchema = z.object({
	indications: indicationsSchema,
	contraIndications: contraIndicationsSchema,
	activeIngredients: activeIngredientsSchema,
	forms: formsSchema,
	categories: categoriesSchema,
	strengths: strengthsSchema
});

export const metadataSchema = _metadataSchema.refine(
	(data) => {
		return Object.keys(data).some((key) => data[key].length > 0);
	},
	{
		message: 'You must at least provide one value.'
	}
);

export type IndicationsSchema = typeof indicationsSchema;
export type ContraIndicationsSchema = typeof contraIndicationsSchema;
export type ActiveIngredientsSchema = typeof activeIngredientsSchema;
export type FormsSchema = typeof formsSchema;
export type CategoriesSchema = typeof categoriesSchema;
export type StrengthsSchema = typeof strengthsSchema;
export type MetadataSchema = typeof metadataSchema;
