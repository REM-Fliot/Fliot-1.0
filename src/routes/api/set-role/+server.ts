import { db } from "$lib/firebase/firebase"
import fliot_admin from "$lib/firebase/firebase_admin"
import admin from "$lib/firebase/firebase_admin"
import { doc, setDoc } from "firebase/firestore/lite"

// export const POST = async({request}) => {
//     const {uid,is_admin} = await request.json()
//     await fliot_admin.auth().setCustomUserClaims(uid, {admin: is_admin}).then(()=>{

//     })

//         const res = fliot_admin.auth().createUser({
//             email: email,
//             password: pass,
//         }).then(async user_credentials => {
//             console.log("user created")
//             return new Response(uid, {status: 200})
//         }).catch((err)=>{
//             console.log(err)
//             return new Response(undefined,{status: 400,statusText: err})
            
//         })
//         return res
// }
