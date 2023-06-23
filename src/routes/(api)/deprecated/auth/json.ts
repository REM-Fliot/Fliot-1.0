// import { auth } from "$lib/firebase/firebase_admin";
// import { dev } from "$app/environment";

// import * as cookie from 'cookie'

// const secure = dev ? '' : ' Secure;'
// const key = import.meta.env.WEB_API_KEY

// export const post = async (event) => {
//     const { email, password } = await event.request.json()
//     const signIn_res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`, {
//         method: 'POST',
//         headers: { 'content-type': 'application/json' },
//         body: JSON.stringify({ email, password, returnSecureToken: true })
//     })
//     if (!signIn_res.ok) return { status: signIn_res.status }
//     const { refreshToken, localId } = await signIn_res.json()
//     const customToken = await auth().createCustomToken(localId)
//     return {
//         status: 200,
//         headers: {
//             // Max-age : seconds
//             'set-cookie': [
//                 `refreshToken=${refreshToken}; Max-Age=${60 * 60 * 24 * 30}; Path=/;${secure} HttpOnly`,
//                 `customToken=${customToken}; Max-Age=${60 * 55}; Path=/;${secure} HttpOnly`,
//             ],
//             'cache-control': 'no-store'
//         },
//     }
// }
