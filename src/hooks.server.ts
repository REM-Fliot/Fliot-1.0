// import admin, { createSessionCookieForUserId } from '$lib/firebase/firebase_admin';
// import { getIdTokenFromSessionCookie } from '$lib/firebase/firebase_admin';
// import { onAuthStateChanged } from 'firebase/auth';
// import type {DecodedIdToken} from 'firebase-admin/auth'
// import { getCookieValue } from '$lib/firebase/get_cookie_value';

import { auth } from "$lib/firebase/firebase";
import { redirect } from "@sveltejs/kit";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import type { Handle } from '@sveltejs/kit';
// import { navigating } from "\/stores";


// /** @type {import('@sveltejs/kit').Handle} */
export const handle: Handle = async ({event, resolve}: {event: any, resolve: any}) => {
    
	// const cookie = event.request.headers.get('cookie')
    // let token = await getIdTokenFromSessionCookie(getCookieValue(cookie,"session"))

	// event.locals.id_token = token

    const response = await resolve(event)
    let authenticated_route = event.route.id?.startsWith("/(authenticated)")
    // if (authenticated_route) {
    //     throw redirect(302, "/login")
    // }

    // let render
    // onAuthStateChanged(auth, async (user) => {
    //     render = user
    //     // console.log(render)
        
    // });

    // if (authenticated_route) {
    //     if (!render) {
    //         throw redirect(302,"/login")
    //     }
    //     else {
    //         // window.location.href="/login"
    //         // authenticated_route = false
    //         // console.log($page.route.id)
    //     }
        
    // }


	// if (
	// 	!response.headers.get('set-cookie') &&
	// 	token &&
	// 	shouldRefreshToken(token)
	// ) {
	// 	const freshSessionCookie = await createSessionCookieForUserId(
	// 		token.uid,
	// 		1000 * 60 * 60 * 24 * 7
	// 	)

	// 	response.headers.set('set-cookie', freshSessionCookie)
	// }

	return response
}

// export const getSession = ({locals}) => {
// 	const user = locals.idToken
// 		? {id: locals.idToken.sub, email: locals.idToken.email}
// 		: null

// 	return {user}
// }

// const shouldRefreshToken = (token: DecodedIdToken | null) =>
// 	token && token.exp - Date.now() / 1000 < 1000 * 60 * 60 * 24
