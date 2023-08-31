import admin_auth from '$lib/firebase/firebase_admin';
import { StatusCodes } from './types';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	//---[Middleware]---
	const is_authenticated_api = event.route.id?.startsWith('/api/private');
	const is_admin_api = event.route.id?.startsWith('/api/private/admin');
	if (is_authenticated_api) {
		console.log('Checking token');
		const auth_header = event.request.headers.get('authorization');
		if (auth_header) {
			const token = auth_header?.split(' ')[1];
			try {
				const claims = await admin_auth.auth().verifyIdToken(token, true);
				if (is_admin_api && !claims.admin) {
					console.log('Invalid, not an admin!');
					return new Response(undefined, {
						status: StatusCodes.Forbidden,
						statusText: 'Invalid Authorization'
					});
					// throw error(403, 'invalid');
				}
				console.log('Verified token!');
			} catch (err) {
				console.log(err);
				return new Response(undefined, {
					status: StatusCodes.Forbidden,
					statusText: 'Invalid Authorization'
				});
				// throw error(403, 'invalid');
			}
		} else {
			return new Response(undefined, {
				status: StatusCodes.Forbidden,
				statusText: 'Invalid Authorization'
			});
		}
	}
	//---[Middleware]---

	const response = await resolve(event);
	return response;
}
