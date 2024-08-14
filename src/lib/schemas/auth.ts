import { z } from 'zod';

export const loginSchema = z.object({
	// email: z.string().email().nullable(),
	username: z
		.string()
		.min(3, 'Username must at least be 6 characters.')
		.max(31)
		.regex(/^[a-z0-9_-]+$/, 'Invalid username'),
	password: z
		.string()
		.min(6, 'Password must at least be 6 characters.')
		.max(255, 'Invalid password')
});

export const registerSchema = z
	.object({
		email: z.string().email().nullable(),
		username: z
			.string()
			.min(2, 'Username must at least be 2 characters.')
			.max(31)
			.regex(/^[a-z0-9_-]+$/, 'Invalid username'),
		firstName: z.string().min(1, 'first name is required.'),
		lastName: z.string().min(1, 'last name is required.'),
		password: z
			.string()
			.min(6, 'Password must at least be 6 characters.')
			.max(255, 'Invalid password'),
		confirmPassword: z.string()
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Password's don't match",
		path: ['confirmPassword']
	});
export const userEditSchema = z.object({
	role: z.enum(['USER', 'ADMIN', 'SUPER_ADMIN'])
});

export type UserEditSchema = typeof userEditSchema;

export type LoginSchema = typeof loginSchema;
export type RegisterSchema = typeof registerSchema;
