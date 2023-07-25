import { db } from "$lib/firebase/firebase"
import fliot_admin from "$lib/firebase/firebase_admin"
import admin from "$lib/firebase/firebase_admin"
import { doc, setDoc } from "firebase/firestore/lite"

export const POST = async({request}) => {
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
