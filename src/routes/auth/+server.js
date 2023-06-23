// // import admin from "$lib/firebase/firebase_admin";
// // import { dev } from "$app/environment";
// // import { json } from "@sveltejs/kit";

// // const secure = dev ? "" : "Secure" //Don't authenticate in dev mode
// // const expiresIn = 1000 * 60 * 60 * 24 //Expires in 1 day

// // export const POST = async (event) => {
// //     const {id_token,csrf_token} = await event.request.json();

// //     try {
// //         const session_cookie = await admin.auth().createSessionCookie(id_token, {expiresIn})
// //         return json(
// //             { status: 200},
// //             {headers: {
// //                 "set-cookie": `session=${session_cookie}; Max-Age=${expiresIn}; Path=/; HttpOnly; ${secure};`
// //             }})
// //     } catch {
// //         return json({
// //             status: 500
// //         })
// //     }
// // }

// const POST = (req, res, next) => {
//     getAuthToken(req, res, async () => {
//       try {
//         const { authToken } = req;
//         const userInfo = await firebaseAdmin.auth().verifyIdToken(authToken);
//         req.authId = userInfo.uid;
//         return next();
//       } catch (e) {
//         return res
//           .status(401)
//           .send({ error: "You are not authorized to make this request." });
//       }
//     });
//   };
