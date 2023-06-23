import { redirect } from '@sveltejs/kit';
import * as cookie from "cookie"
import admin from '$lib/firebase/firebase_admin';
import { auth } from "$lib/firebase/firebase";
import { goto } from '$app/navigation';
import { getApps } from 'firebase/app';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    // const {session} = cookie.parse(event.request.headers.get("cookie") || "")
    // console.log(session)
    // console.log(event.cookies.getAll())
    // console.log(event.cookies)
    // if (!getApps.length) {
    //     auth.onAuthStateChanged((user) => {
    //         if (event.route.id?.startsWith("/(protected)") ) {
    //             if (!user) {
    //                 //Protects routes
    //                 // throw redirect(302, "/login")
    //                 console.log("hello")
                    
    //             }
               
    //         }
            
    //     })
    // }
    
    
    // event.locals.user = 
    // event.cookies.
    
    const response = await resolve(event);
    return response;
}
