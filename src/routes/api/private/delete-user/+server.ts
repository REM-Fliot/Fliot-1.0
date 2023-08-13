import { db } from "$lib/firebase/firebase"
import admin_auth from "$lib/firebase/firebase_admin"
import admin from "$lib/firebase/firebase_admin"
import { doc, setDoc } from "firebase/firestore/lite"
import { StatusCodes } from "../../../types"

export const POST = async({request}) => {
    const {uid} = await request.json()
    console.log("deleting",uid)
    const res = admin_auth.auth().deleteUser(uid).then(() => {
        console.log("user deleted")
        return new Response(undefined, {status: StatusCodes.Success})
    }).catch((err)=>{
        console.log(err)
        return new Response(undefined,{status: StatusCodes.BadRequest,statusText: err})
        
    })
    return res
}
