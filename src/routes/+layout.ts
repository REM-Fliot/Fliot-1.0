import { get } from 'svelte/store';
import { redirect } from '@sveltejs/kit';
import { onMount } from 'svelte';
import { auth, db } from '../lib/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { goto } from '$app/navigation';
import { page } from '$app/stores';
import Spinner from '../components/Spinner.svelte';
import { auth_user, creating_company} from '../store/authUser';
import { collection, doc, getDoc } from 'firebase/firestore/lite';
import { browser } from '$app/environment';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load(LayoutLoadEvent) {
    const is_authenticated = LayoutLoadEvent.route.id?.startsWith('/(protected)')
    
    onAuthStateChanged(auth, async (user) => {
        if (!get(creating_company) && browser) {
            //onAuthStateChanged = when the user variable is resolve - either it is null (not signed in), or User object.
            if (user) {
                // console.log("hello")
                let company
                const col_ref = doc(db, "users", user.uid)
                await getDoc(col_ref).then(snapshot=>{
                    if (snapshot.exists()) {
                        company = snapshot.data()?.COMPANY
                        if (company) {
                            auth_user.set({user: user, company: company})
                        }
                        else {
                            throw error(400,"No company exists for this user")
                        }
                    }
                    else {
                        throw error(400,"No user exists with that id")
                    }
                })
            }
            else {
                auth_user.set(null)
            }
        }
    });




    if (get(auth_user)?.user === null && is_authenticated) {
        console.log("Redirected to login (not logged in)")
        throw redirect(302, "/login")
    }
    else if (get(auth_user)?.user && !is_authenticated) {
        console.log("Redirected to dashboard (logged in)")
        throw redirect(302,"/dashboard")
    }
}
