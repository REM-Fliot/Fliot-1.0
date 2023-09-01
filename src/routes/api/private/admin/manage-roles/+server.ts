import fliot_admin from '$lib/firebase/firebase_admin';
import { StatusCodes } from '../../../../../types';

export const POST = async (RequestEvent) => {
	const { claims } = await RequestEvent.request.json();
	const uid = RequestEvent.url.searchParams.get('uid');

	if (!uid) {
		return new Response(undefined, { status: StatusCodes.BadRequest, statusText: 'Invalid uid' });
	}
	const res = await fliot_admin
		.auth()
		.setCustomUserClaims(uid, claims)
		.then(() => {
			return new Response(undefined, { status: StatusCodes.Success });
		})
		.catch((err) => {
			console.log(err);
			return new Response(undefined, { status: StatusCodes.BadRequest, statusText: err });
		});
	return res;
};
