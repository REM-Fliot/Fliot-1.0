import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { page } from '$app/stores';
import type { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { get } from 'svelte/store';
import { db } from '../lib/firebase/firebase';
import { creating_company, current_company, loaded } from '../store/authStores';
import { setAdminFromListener } from './auth-listeners';

const resolveUser = async (user: User | null) => {
	console.log('resolving user');
	if (!get(creating_company) && browser) {
		//onAuthStateChanged = when the user variable is resolved - either it is null (not signed in), or User object.
		let company: string | null = null;

		//All routes under the (protected) folder
		const protected_route = get(page).route.id?.startsWith('/(protected)');
		if (user) {
			const user_ref = doc(db, 'users', user.uid);
			company = await getDoc(user_ref).then(async (snapshot) => {
				if (!snapshot.exists()) {
					throw new Error('No user exists with that id');
				}
				return snapshot.data().COMPANY;
			});

			if (company === undefined || company === null) {
				throw new Error('No company exists for this user');
			}
			const employee_ref = doc(db, 'companies', company, 'employees', user.uid);
			console.log('setting admin listener');
			await getDoc(employee_ref).then(setAdminFromListener);

			if (!protected_route) {
				//Logged in but trying to access the login page
				console.log('Redirected to dashboard (logged in) (from client)');
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
		current_company.set(company);
		loaded.set(true);
		console.log('auth state resolved');
	}
};

export default resolveUser;
