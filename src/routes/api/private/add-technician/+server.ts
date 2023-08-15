import { db } from '$lib/firebase/firebase';
import admin_auth from '$lib/firebase/firebase_admin';
import admin from '$lib/firebase/firebase_admin';
import { doc, setDoc } from 'firebase/firestore';

export const POST = async ({ request }) => {
	const { email, pass, username } = await request.json();
	const res = admin_auth
		.auth()
		.createUser({
			email: email,
			password: pass,
			displayName: username
		})
		.then(async (user_credentials) => {
			console.log('user created');
			return new Response(user_credentials.uid, { status: 200 });
		})
		.catch((err) => {
			console.log(err);
			return new Response(undefined, { status: 400, statusText: err });
		});
	return res;
};
