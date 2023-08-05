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
    const {email,pass,username,uid} = await request.json()
        const res = fliot_admin.auth().createUser({
            email: email,
            password: pass,
            displayName: username
        }).then(async user_credentials => {
            console.log("user created")
            return new Response(user_credentials.uid, {status: 200})
        }).catch((err)=>{
            console.log(err)
            return new Response(undefined,{status: 400,statusText: err})
            
        })
        return res
}
