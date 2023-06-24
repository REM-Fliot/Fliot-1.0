import admin from "firebase-admin"
import * as credential from "./fliot-authentication-firebase-adminsdk-d1e7c-91abcc304e.json"
import type SessionCookieOptions from "firebase-admin/auth";
import type { DecodedIdToken } from "firebase-admin/auth";

admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(JSON.stringify(credential)))
    //JSON conversion is hacky solution for TypeScript
});

const api_key = import.meta.env.WEB_API_KEY
const auth = admin.auth()

export const createSessionCookieForUserId = async (userId: string, maxAge: number) => {

	const customToken = await auth.createCustomToken(userId, {})
	const firebaseIdToken = await fetch(
		`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${api_key}`,
		{
			method: 'POST',
			body: JSON.stringify({token: customToken, returnSecureToken: true}),
		}
	)
		.then((res) => res.json())
		.then((res) => res.id_token)

    const session = await auth.createSessionCookie(firebaseIdToken, {
        expiresIn: maxAge,
    })
}

// export const verifyIdToken = (token: string): Promise<DecodedIdToken> => {
// 	return auth.verifyIdToken(token)
// }

export const getIdTokenFromSessionCookie = async (sessionCookie: string | null): Promise<DecodedIdToken | null> => {
	if (!sessionCookie) return null

	return auth.verifySessionCookie(sessionCookie, true).catch(() => null)
}

export default admin
