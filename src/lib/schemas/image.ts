import { z } from 'zod';

export const imageSchema = z.object({
	isPrimary: z.boolean().default(true),
	drugItemID: z.string().min(1, 'You must select a drug'),
	imageID: z.string()
});

export type ImageSchema = typeof imageSchema;
