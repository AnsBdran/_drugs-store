import { z } from 'zod';
const SelectOptionSchema = z.object({
	value: z.string(),
	label: z.string(),
	disabled: z.boolean()
});

export const drugSchema = z.object({
	name: z.object({
		brand: z.string().min(1),
		generic: z.string().array().min(1)
	}),
	indications: z.string().array(),
	// indications: z.array(SelectOptionSchema),
	contraIndications: z.array(SelectOptionSchema),
	manufacturerID: z.string(),
	categoryIDs: z.array(SelectOptionSchema)
});
