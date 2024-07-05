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
	name: z.object({
		brand: z.string().min(1),
		generic: z.array(z.string().min(1)).nonempty().default([''])
	}),
	indications: multiSelectSchema,
	contraIndications: multiSelectSchema,
	categoryIDs: multiSelectSchema,
	manufacturerID: z.string().min(1, 'You must choose a manufacturer')
});

// indications: z.array(z.string()).min(1),
// contraIndications: z.array(z.string()).min(1),
// categoryIDs: z.array(z.string()).min(1),
