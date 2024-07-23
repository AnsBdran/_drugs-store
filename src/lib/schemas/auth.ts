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
			.min(3, 'Username must at least be 6 characters.')
			.max(31)
			.regex(/^[a-z0-9_-]+$/, 'Invalid username'),
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

export type LoginSchema = typeof loginSchema;
export type RegisterSchema = typeof registerSchema;
