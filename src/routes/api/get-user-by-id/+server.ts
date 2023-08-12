import { db } from "$lib/firebase/firebase"
import fliot_admin from "$lib/firebase/firebase_admin"
import admin from "$lib/firebase/firebase_admin"
import { doc, setDoc } from "firebase/firestore/lite"
import { verifyToken } from "../../../utility/api_utility.js"

export const POST = async({request}) => {
    try {
        verifyToken()
    }
    catch (err:any) {
        console.log(err);
        return new Response(undefined,{status: 403,statusText: err})
    }
    const {email} = await request.json()

    const res = fliot_admin.auth().getUserByEmail(email).then(async user_credentials => {
        console.log("user found")
        return new Response(user_credentials.uid, {status: 200})
    }).catch((err)=>{
        console.log(err)
        return new Response(undefined,{status: 404,statusText: err})
        
    })
    return res
}
