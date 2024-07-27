import { fail, setError, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { loginSchema, registerSchema } from '$lib/schemas/auth';
import prisma from '$lib/server/prisma';
import { hash, verify } from '@node-rs/argon2';
import { lucia } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) redirect(302, '/dashboard');
	const loginForm = await superValidate(zod(loginSchema));
	const registerForm = await superValidate(zod(registerSchema));
	return { loginForm, registerForm };
};

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		console.log('login action');
		const form = await superValidate(request, zod(loginSchema));
		const { password, username } = form.data;
		if (!form.valid) {
			return fail(400, { form });
		}

		const user = await prisma.user.findUnique({
			where: {
				username: username
			}
		});

		if (!user) {
			console.log('failed');
			return setError(form, 'username', 'There is no such user!');
		}

		const validPassword = await verify(user.passwordHash, password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		if (!validPassword) {
			console.log('wrong password');
			return fail(400, {
				form
			});
		}
		console.log('about to end');
		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
		console.log('ended');
		redirect(302, '/');
	},

	// ==========================
	// Signup====================
	signup: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(registerSchema));
		const { password, username, email, firstName, lastName } = form.data;

		if (!form.valid) {
			return fail(400, { form });
		}

		const isAvailable = await prisma.user.findUnique({
			where: {
				username: username
			}
		});

		console.log('asdfl', isAvailable);
		if (isAvailable) {
			return setError(form, 'username', 'username not available');
		}

		const passwordHash = await hash(password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		try {
			const user = await prisma.user.create({
				data: {
					username,
					passwordHash,
					firstName,
					lastName,
					email: email ?? undefined
				}
			});

			console.log('prisma said', user);
			const session = await lucia.createSession(user.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});

			redirect(302, '/');
		} catch (error) {
			console.log(error);
			fail(401, { form });
		}
	},
	logout: async ({ locals, cookies }) => {
		if (!locals.session) {
			return fail(401);
		}
		await lucia.invalidateSession(locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
		redirect(302, '/auth');
	}
};
