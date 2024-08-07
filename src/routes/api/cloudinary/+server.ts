import { env } from '$env/dynamic/private';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { v2 as cloudinary } from 'cloudinary';

// export const POST = (async ({ request }) => {
// 	const body = await request.json();
// 	const { paramsToSign } = body;
// 	console.log('body', body);
// 	try {
// 		const signature = cloudinary.uploader.upload(paramsToSign, env.CLOUDINARY_API_SECRET);
// 		console.log('signature', signature);
// 		return json({ signature });
// 	} catch (e) {
// 		return error(500, e.message);
// 	}
// }) satisfies RequestHandler;
export const POST = (async ({ request }) => {
	const body = await request.json();
	const { paramsToSign } = body;
	console.log('body', body);
	try {
		const signature = cloudinary.utils.api_sign_request(paramsToSign, env.CLOUDINARY_API_SECRET);
		console.log('signature', signature);
		return json({ signature });
	} catch (e) {
		return error(500, e.message);
	}
}) satisfies RequestHandler;