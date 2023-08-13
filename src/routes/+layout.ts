import { get } from 'svelte/store';
import { redirect } from '@sveltejs/kit';
import { onMount } from 'svelte';
import { client_auth, db } from '../lib/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { goto } from '$app/navigation';
import { page } from '$app/stores';
import Spinner from '../components/Spinner.svelte';
import { creating_company, current_company, loaded } from '../store/authStores';
import { collection, doc, getDoc } from 'firebase/firestore/lite';
import { browser } from '$app/environment';
import { error } from '@sveltejs/kit';
import resolveUser from '../auth/resolve-user';
import type { PageLoad } from './(protected)/firestore/$types';

/** @type {import('./$types').PageLoad} */
export function load(LayoutLoadEvent: PageLoad) {
	const is_authenticated = LayoutLoadEvent.route.id?.startsWith('/(protected)');
}
