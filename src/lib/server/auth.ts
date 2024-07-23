import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { Lucia } from 'lucia';
import prisma from './prisma';
import { dev } from '$app/environment';
import type { Role, User } from '@prisma/client';

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			username: attributes.username,
			name: `${attributes.firstName} ${attributes.lastName}`,
			email: attributes.email,
			role: attributes.role
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: Omit<User, 'id'>;
	}
}

interface DatabaseUserAttributes {
	username: string;
	name: string;
	email: string;
	role: Role;
}
