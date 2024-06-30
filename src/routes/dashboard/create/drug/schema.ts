import { z } from 'zod';

export const drugSchema = z.object({
	name: z.object({
		brand: z.string().min(1),
		generic: z.string().min(1)
	}),
	indications: z.string().array(),
	contraIndications: z.string().array(),
	manufacturerID: z.string(),
	categoryIDs: z.string().array()
});
