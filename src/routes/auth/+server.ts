// import {admin} from "$lib/firebase/firebase_admin";
// import { dev } from "$app/environment";
// import { json } from "@sveltejs/kit";

// // // const secure = dev ? "" : "Secure" //Don't authenticate in dev mode
// const expires_in = 1000 * 60 * 60 * 24 * 7 //Expires in 7 days
// const expires_in_one_day = 1000 * 60 * 60 * 24

// // POST /auth/session
// export const POST = async ({request}) => {
// 	const authHeader = request.headers.get('Authorization') || ''
// 	const [scheme, token] = authHeader.split(' ')
// 	if (scheme !== 'Bearer' || !token) {
// 		return json({status: 401, body: "invalid authorization header"})
// 	}

// 	try {
// 		const {sub, email} = await admin.verifyIdToken(token)

// 		const sessionCookie = await admin.createSessionCookie(token, expires_in)

// 		const user = {
// 			id: sub,
// 			email,
// 		}

// 		return json({
// 			status: 200,
// 			body: user,
// 			headers: {
// 				'Set-Cookie': sessionCookie,
// 			},
// 		})
// 	} catch {
// 		return json({status: 401, body: 'invalid token'})
// 	}
// }

// const expiredCookie = 'session=; SameSite=Strict; Path=/; HttpOnly; Max-Age=0;'

// export const DELETE = () => {
// 	return json({
// 		status: 200,
// 		headers: {
// 			'Set-Cookie': expiredCookie,
// 		},
// 	})
// }
