import admin_auth from '$lib/firebase/firebase_admin';
import { error } from '@sveltejs/kit';
import { StatusCodes } from './types';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	//---[Middleware]---
	const is_authenticated_api = event.route.id?.startsWith('/api/private');
	if (is_authenticated_api) {
		console.log('Checking token');
		const auth_header = event.request.headers.get('authorization');
		if (auth_header) {
			const token = auth_header?.split(' ')[1];
			try {
				admin_auth
					.auth()
					.verifyIdToken(token, true)
					.then(() => {
						console.log('Verified token!');
					});
			} catch (err) {
				console.log(err);
				throw error(StatusCodes.Forbidden, 'Invalid Authorization');
			}
		} else {
			throw error(StatusCodes.Forbidden, 'Invalid Authorization');
		}
	}
	//---[Middleware]---

	const response = await resolve(event);
	return response;
}
