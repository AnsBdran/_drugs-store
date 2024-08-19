import { json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	return json({ foo: 'bar' });
};
