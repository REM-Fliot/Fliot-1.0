import { db } from '$lib/firebase/firebase';
import admin_auth from '$lib/firebase/firebase_admin';
import { doc, getDoc } from 'firebase/firestore';
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
				const uid = claims.uid;
				const user_ref = doc(db, 'users', uid);
				let company = undefined;
				let tech_company = undefined;
				let type = undefined;
				await getDoc(user_ref).then(async (snapshot) => {
					if (!snapshot.exists()) {
						return new Response(undefined, {
							status: StatusCodes.BadRequest,
							statusText: 'No user exists with that id'
						});
					}
					company = snapshot.data().COMPANY;
					tech_company = snapshot.data().TECHNICIAN_COMPANY;
					type = snapshot.data().USER_TYPE;
				});

				if (company === undefined || company === null) {
					return new Response(undefined, {
						status: StatusCodes.BadRequest,
						statusText: 'User not assigned to any company'
					});
				}
				let employee_ref = undefined;
				if (type == 'TECHNICIAN') {
					employee_ref = doc(db, 'companies', company, 'employees', uid);
				} else {
					//If ENDUSER (for now)
					employee_ref = doc(
						db,
						'companies',
						tech_company!,
						'end-users',
						company,
						'employees',
						uid
					);
				}
				const snapshot = await getDoc(employee_ref);
				if (!snapshot.exists()) {
					return new Response(undefined, {
						status: StatusCodes.BadRequest,
						statusText: 'Requested company does not have this user'
					});
				}
				console.log(snapshot.data());
				if (is_admin_api && !snapshot.data().IS_ADMIN) {
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
