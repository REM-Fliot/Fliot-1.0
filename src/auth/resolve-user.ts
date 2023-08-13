import { onMount } from 'svelte';
import { client_auth, db } from '../lib/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { goto } from '$app/navigation';
import { page } from '$app/stores';
import Spinner from '../components/Spinner.svelte';
import { current_company, creating_company, loaded } from '../store/authStores';
import { collection, doc, getDoc } from 'firebase/firestore/lite';
import { browser } from '$app/environment';
import { error } from '@sveltejs/kit';
import { get } from 'svelte/store';

const resolveUser = async (user: User | null) => {
	if (!get(creating_company) && browser) {
		//onAuthStateChanged = when the user variable is resolved - either it is null (not signed in), or User object.
		let company = null;
		let protected_route = get(page).route.id?.startsWith('/(protected)');
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
		}
		if (protected_route) {
			if (!user) {
				//Not logged in but trying to access protected routes
				console.log('Redirected to login (not logged in) (from client)');
				await goto('/login');
			}
		} else {
			if (user) {
				//Logged in but trying to access the login page
				console.log('Redirected to dashboard (logged in) (from load)');
				await goto('/dashboard');
			}
		}
		//The user state is resolved, and loading is finished.
		current_company.set(company);
		loaded.set(true);
	}
};

export default resolveUser;
