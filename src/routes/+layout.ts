import { get } from 'svelte/store';
import { auth_user } from '../store/authUser.js';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load(LayoutLoadEvent) {

    const is_authenticated = LayoutLoadEvent.route.id?.startsWith('/(protected)')
    // is_loading.set(true);
    // console.log(LayoutLoadEvent.route.id)
    // console.log(get(auth_user))
    // console.log(is_authenticated)
    if (get(auth_user) === null && is_authenticated) {
        console.log("Redirected to login (not logged in)")
        throw redirect(302, "/login")
    }
    else if (get(auth_user) && !is_authenticated) {
        console.log("Redirected to dashboard (logged in)")
        throw redirect(302,"/dashboard")
    }
}
