// import { db } from "$lib/firebase/firebase"
// import fliot_admin from "$lib/firebase/firebase_admin"
// import admin from "$lib/firebase/firebase_admin"
// import { doc, setDoc } from "firebase/firestore/lite"
// import { convertRoleToClaim, verifyToken } from "../../../utility/api_utility"
// import { Roles, StatusCodes } from "../../../types"

// export const POST = async({request}) => {
//     try {
//         verifyToken()
//     }
//     catch (err:any) {
//         console.log(err);
//         return new Response(undefined,{status: StatusCodes.Forbidden, statusText: err})
//     }

//     const {uid,role} = await request.json()
//     const claims = convertRoleToClaim(role)
//     const res = await fliot_admin.auth().setCustomUserClaims(uid, claims).then(()=>{
//         console.log(`${role} added `)
//         return new Response(uid, {status: 200})
//     }).catch((err)=>{
//         console.log(err)
//         return new Response(undefined,{status: StatusCodes.BadRequest,statusText: err})
        
//     })

//         const res = fliot_admin.auth().createUser({
//             email: email,
//             password: pass,
//         }).then(async user_credentials => {
//             console.log("user created")
//             return new Response(uid, {status: 200})
//         }).catch((err)=>{
//             console.log(err)
//             return new Response(undefined,{status: StatusCodes.BadRequest,statusText: err})
            
//         })
//         return res
// }
