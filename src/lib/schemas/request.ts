import { z } from 'zod';

const _requestSchema = z.object({
	brandName: z.string().min(1).nullable(),
	genericName: z.string().min(1).nullable(),
	strength: z.string().min(1).nullable(),

	description: z.string().nullable()
});

export const requestSchema = _requestSchema.refine((data) => data.brandName || data.genericName, {
	message: 'You must provide either the brand or generic name.'
});

export const requestEditSchema = _requestSchema.extend({
	responseStatus: z.enum(['PENDING', 'ACCEPTED', 'REJECTED']).default('ACCEPTED')
});

export type RequestSchema = typeof requestSchema;
export type RequestEditSchema = typeof requestEditSchema;
