import admin_auth from '$lib/firebase/firebase_admin';
import { StatusCodes } from '../../../../../types';

export const DELETE = async ({ request }: any) => {
	console.log(request);
	const { uid } = await request.json();
	console.log('deleting', uid);
	const res = admin_auth
		.auth()
		.deleteUser(uid)
		.then(() => {
			console.log('user deleted');
			return new Response(undefined, { status: StatusCodes.Success });
		})
		.catch((err) => {
			console.log(err);
			return new Response(undefined, { status: StatusCodes.BadRequest, statusText: err });
		});
	return res;
};
