import { z } from 'zod';
const manufacturerSchema = z.object({
	name: z.string().min(1),
	country: z.string().min(1, {
		message: 'Please choose a country'
	}),
	city: z.string().min(1),
	description: z.string().optional(),
	featured: z.boolean()
});

export default manufacturerSchema;
