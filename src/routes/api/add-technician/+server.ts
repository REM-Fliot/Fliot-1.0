import { db } from "$lib/firebase/firebase"
import fliot_admin from "$lib/firebase/firebase_admin"
import admin from "$lib/firebase/firebase_admin"
import { doc, setDoc } from "firebase/firestore/lite"

export const POST = async({request}) => {
    const {email,pass,uid} = await request.json()
    // console.log(requestEvent.request)
    // console.log("request sent")
    
    // addTechnician: async (email: string, pass:string) => {
        // console.log("MAKING NEW USER")
        const res = fliot_admin.auth().createUser({
            email: email,
            password: pass,
        }).then(async user_credentials => {
            console.log("user created")
            return new Response(uid, {status: 200})
        }).catch((err)=>{
            console.log(err)
            return new Response(undefined,{status: 400,statusText: err})
            
        })
        return res
}
