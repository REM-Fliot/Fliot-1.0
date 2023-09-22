import admin_auth from '$lib/firebase/firebase_admin';
import { StatusCodes } from '../../../../types.js';

export const GET = async (event) => {
	console.log(event);
	const uid = event.url.searchParams.get('uid');
	if (!uid) {
		return new Response(undefined, {
			status: StatusCodes.BadRequest,
			statusText: 'No user id provided'
		});
	}
	const res = admin_auth
		.auth()
		.getUser(uid)
		.then(async (user_credentials) => {
			console.log('user found');
			const claims = JSON.stringify(user_credentials.customClaims);
			return new Response(claims, { status: StatusCodes.Success });
		})
		.catch((err) => {
			console.log(err);
			return new Response(undefined, { status: StatusCodes.NotFound, statusText: err });
		});
	return res;
};
