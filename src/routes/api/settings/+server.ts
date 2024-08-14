import { json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	console.log('setting post ran');
	// const data = request.json();

	return json({ foo: 'bar' });
};
