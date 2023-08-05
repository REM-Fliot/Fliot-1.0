import { get } from "svelte/store"
import { auth_user } from "../store/authUser"
import { error } from "@sveltejs/kit"
import fliot_admin from "$lib/firebase/firebase_admin"

export const verifyToken = async () => {
    const user_data = get(auth_user)
    if (!user_data) {
        throw error(403, "User is not defined")
    }
    //not sure if I should force refresh here
    await user_data.user.getIdToken(true).then(async (decoded_token)=> {
        fliot_admin.auth().verifyIdToken(decoded_token, true).catch(()=> {
            throw error(403, "Invalid ID Token")
        })
    }).catch(async () => {
        throw error(403, "Unable to retrieve ID Token")
    })

}
