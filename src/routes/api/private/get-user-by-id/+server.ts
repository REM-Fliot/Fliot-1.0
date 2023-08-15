import admin_auth from '$lib/firebase/firebase_admin';

export const POST = async ({ request }: any) => {
	const { email } = await request.json();

	const res = admin_auth
		.auth()
		.getUserByEmail(email)
		.then(async (user_credentials) => {
			console.log('user found');
			return new Response(user_credentials.uid, { status: 200 });
		})
		.catch((err) => {
			console.log(err);
			return new Response(undefined, { status: 404, statusText: err });
		});
	return res;
};
