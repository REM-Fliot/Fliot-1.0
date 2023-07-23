import { get } from 'svelte/store';
import { auth_user } from '../store/authUser.js';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load(LayoutLoadEvent) {

    const is_authenticated = LayoutLoadEvent.route.id?.startsWith('/(protected)')
    
    if (get(auth_user)?.user === null && is_authenticated) {
        console.log("Redirected to login (not logged in)")
        throw redirect(302, "/login")
    }
    else if (get(auth_user)?.user && !is_authenticated) {
        console.log("Redirected to dashboard (logged in)")
        throw redirect(302,"/dashboard")
    }
}
