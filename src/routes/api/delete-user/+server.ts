import { db } from "$lib/firebase/firebase"
import fliot_admin from "$lib/firebase/firebase_admin"
import admin from "$lib/firebase/firebase_admin"
import { doc, setDoc } from "firebase/firestore/lite"

export const POST = async({request}) => {
    const {uid} = await request.json()

        const res = fliot_admin.auth().deleteUser(uid).then(() => {
            console.log("user deleted")
            return new Response(undefined, {status: 200})
        }).catch((err)=>{
            console.log(err)
            return new Response(undefined,{status: 400,statusText: err})
            
        })
        return res
}
