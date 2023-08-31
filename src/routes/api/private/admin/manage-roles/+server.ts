import fliot_admin from '$lib/firebase/firebase_admin';
import { StatusCodes } from '../../../../../types';

export const POST = async ({ request }: any) => {
	const { uid, claims } = await request.json();

	const res = await fliot_admin
		.auth()
		.setCustomUserClaims(uid, claims)
		.then(() => {
			console.log(`Claims updated for ${uid}: ${claims}`);
			return new Response(undefined, { status: StatusCodes.Success });
		})
		.catch((err) => {
			console.log(err);
			return new Response(undefined, { status: StatusCodes.BadRequest, statusText: err });
		});
	return res;
};
