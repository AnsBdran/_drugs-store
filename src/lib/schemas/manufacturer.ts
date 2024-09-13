import { z } from 'zod';
export const manufacturerSchema = z.object({
	name: z.string().min(1),
	country: z.string().min(1, {
		message: 'Please choose a country'
	}),
	city: z.string().min(1),
	description: z.string().nullable(),
	featured: z.boolean()
});

export type ManufacturerSchema = typeof manufacturerSchema;
