import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { page } from '$app/stores';
import type { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { get } from 'svelte/store';
import { db } from '../lib/firebase/firebase';
import { creating_company, current_company, loaded, roles } from '../store/authStores';
import { Claims } from '../types';

const resolveUser = async (user: User | null) => {
	if (!get(creating_company) && browser) {
		//onAuthStateChanged = when the user variable is resolved - either it is null (not signed in), or User object.
		let company = null;
		let claims = null;

		//All routes under the (protected) folder
		let protected_route = get(page).route.id?.startsWith('/(protected)');
		let admin_route = get(page).route.id?.startsWith('/(protected)/(admin)');
		if (user) {
			const col_ref = doc(db, 'users', user.uid);
			await getDoc(col_ref).then((snapshot) => {
				if (snapshot.exists()) {
					company = snapshot.data()?.COMPANY;
					if (!company) {
						throw new Error('No company exists for this user');
					}
				} else {
					throw new Error('No user exists with that id');
				}
			});
			const token_result = await user.getIdTokenResult(true);
			claims = new Claims(token_result.claims.admin, token_result.claims.user_type);
			if (!protected_route) {
				//Logged in but trying to access the login page
				console.log('Redirected to dashboard (logged in) (from client)');
				await goto('/dashboard');
			} else if (admin_route && !claims.admin) {
				//Not admin but trying to access admin route
				console.log('Redirected to dashboard (not admin) (from client)');
				await goto('/dashboard');
			}
		} else {
			if (protected_route) {
				//Not logged in but trying to access protected routes
				console.log('Redirected to login (not logged in) (from client)');
				await goto('/login');
			}
		}
		//The user state is resolved, and loading is finished.
		loaded.set(true);
		current_company.set(company);
		roles.set(claims);
	}
};

export default resolveUser;
