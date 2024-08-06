// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		type USER_ROLE = 'ADMIN' | 'SUPER_ADMIN' | 'USER';
		type CLOUDINARY_Asset = {
			asset_id: string;
			public_id: string;
			version: number;
			version_id: string;
			signature: string;
			width: number;
			height: number;
			format: string;
			resource_type: string;
			created_at: string;
			tags: string[];
			pages: number;
			bytes: number;
			type: string;
			etag: string;
			placeholder: boolean;
			url: string;
			secure_url: string;
			asset_folder: string;
			display_name: string;
			image_metadata: ImageMetadata;
			illustration_score: number;
			semi_transparent: boolean;
			grayscale: boolean;
			original_filename: string;
			eager: EagerTransformation[];
			api_key: string;
			path: string;
		};
		// interface Error {}
		interface Locals {
			user: import('lucia').User | null;
			session: import('lucia').Session | null;
		}

		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		namespace Superforms {
			type Message = {
				type: 'error' | 'success';
				text: string;
			};
		}
	}
}

export {};
