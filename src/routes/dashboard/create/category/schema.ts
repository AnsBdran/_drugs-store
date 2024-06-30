import { z } from 'zod';
// import z from 'zod';
export const categoryFormSchema = z.object({
	name: z.string().min(2),
	description: z.string().min(5),
	image: z.instanceof(File, { message: 'please proivde a valid image' })
	// .refine((file) => file.type.startsWith('image/'), {
	// 	message: 'Must be an image file'
	// })
	// .refine((file) => file.size <= 5 * 1024 * 1024, {
	// 	// 5 MB limit
	// 	message: 'File size must be less than 5MB'
	// })
});
