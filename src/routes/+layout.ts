import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { client_auth } from '../lib/firebase/firebase';
import { loaded, roles } from '../store/authStores';

/** @type {import('./$types').PageLoad} */
export function load(LayoutLoadEvent) {
	const protected_route = LayoutLoadEvent.route.id?.startsWith('/(protected)');
	const admin_route = LayoutLoadEvent.route.id?.startsWith('/(protected)/(admin)');

	const claims = get(roles);

	//Mostly redundant I believe
	if (get(loaded)) {
		if (client_auth.currentUser === null && protected_route) {
			console.log('Redirected to login (not logged in) (from load)');
			throw redirect(302, '/login');
		} else if (client_auth.currentUser && !protected_route) {
			console.log('Redirected to dashboard (logged in) (from load)');
			throw redirect(302, '/dashboard');
		}
		if (claims) {
			if (!claims.admin && admin_route) {
				console.log('Redirected to dashboard (not admin) (from load)');
				throw redirect(302, '/dashboard');
			}
		}
	}
}
