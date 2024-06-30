import {
	CLOUDINARY_API_SECRET,
	VITE_PUBLIC_CLOUDINARY_API_KEY,
	VITE_PUBLIC_CLOUDINARY_CLOUD_NAME
} from '$env/static/private';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
	cloud_name: VITE_PUBLIC_CLOUDINARY_CLOUD_NAME,
	api_key: VITE_PUBLIC_CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_API_SECRET
});

export default cloudinary;
