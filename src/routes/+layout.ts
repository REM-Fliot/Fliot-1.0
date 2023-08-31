import { get } from 'svelte/store';
import { redirect } from '@sveltejs/kit';
import { onMount } from 'svelte';
import { client_auth, db } from '../lib/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { goto } from '$app/navigation';
import { page } from '$app/stores';
import Spinner from '../components/Spinner.svelte';
import { creating_company, current_company, loaded } from '../store/authStores';
import { collection, doc, getDoc } from 'firebase/firestore';
import { browser } from '$app/environment';
import { error } from '@sveltejs/kit';
import resolveUser from '../auth/resolve-user';

/** @type {import('./$types').PageLoad} */
export function load(LayoutLoadEvent) {
	const is_authenticated = LayoutLoadEvent.route.id?.startsWith('/(protected)');

	//Mostly redundant I believe
	if (get(loaded)) {
		if (client_auth.currentUser === null && is_authenticated) {
			console.log('Redirected to login (not logged in) (from load)');
			throw redirect(302, '/login');
		} else if (client_auth.currentUser && !is_authenticated) {
			console.log('Redirected to dashboard (logged in) (from load)');
			throw redirect(302, '/dashboard');
		}
	}
}
