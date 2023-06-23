// import { auth } from "$lib/firebase/firebase_admin";
// import { dev } from "$app/environment";

// const secure = dev ? "" : "Secure" //Don't authenticate in dev mode
// const key = import.meta.env.WEB_API_KEY
// const expiresIn = 1000 * 60 * 60 * 24


// export const post = async (event) => {

//     const {email,password} = await event.request.json()
//     const user_record = await auth().createUser({
//         email,
//         password,
//     })
//     const uid = user_record.uid
//     await auth().setCustomUserClaims(uid,{'early_access': true})
//     const signin_res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`, {
//         method: 'POST',
//         headers: { 'content-type': 'application/json' },
//         body: JSON.stringify({ email, password, 'returnSecureToken': true })
//     })
//     if (!signin_res.ok) return { status: signin_res.status}
//     const { refreshToken } = await signin_res.json()
//     const customToken = await auth().createCustomToken(uid)
//     return {
//         status: 200,
//         headers: {
//             'set-cookie': [
//                 `customToken=${customToken}; Max-Age=${60 * 55}; Path=/;${secure} HttpOnly`,
//                 `refreshToken=${refreshToken}; Max-Age=${60 * 60 * 24 * 30}; Path=/;${secure} HttpOnly`,
//             ],
//             'cache-control': 'no-store'
//         }
//     }
//     // const {idToken} = await event.request.json();
//     // try {
//     //     const session_cookie = await admin.auth().createSessionCookie(idToken, {expiresIn})
//     //     return {
//     //         status: 200,
//     //         headers: {
//     //             "set-cookie": `session=${session_cookie}; Max-Age=${expiresIn}; Path=/; HttpOnly; ${secure};`
//     //         }
//     //     }
//     // } catch {
//     //     return {
//     //         status: 500
//     //     }
//     // }
// }
