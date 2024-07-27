import { z } from 'zod';

const _requestSchema = z.object({
	brandName: z.string().min(1).optional(),
	genericName: z.string().min(1).optional(),
	strength: z.string().min(1).optional(),
	image: z
		.instanceof(File, { message: 'Please provide a valid image' })
		.refine((f) => f.size < 2000_000, 'Max 2 MB upload size.')
		.optional(),
	description: z.string().optional()
});

export const requestSchema = _requestSchema.refine((data) => data.brandName || data.genericName, {
	message: 'You must provide either the brand or generic name.'
});

export const requestEditSchema = _requestSchema.extend({
	responseStatus: z.enum(['pending', 'accepted', 'rejected']).default('accepted')
	// response: z.string().optional()
});

export type RequestSchema = typeof requestSchema;
export type RequestEditSchema = typeof requestEditSchema;
