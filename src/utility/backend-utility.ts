import { get } from "svelte/store"
import { auth_user } from "../store/authUser"
import { error } from "@sveltejs/kit"
import admin_auth from "$lib/firebase/firebase_admin"
import { RequestMethod, Roles } from "../types"
import { client_auth } from "$lib/firebase/firebase"

export const verifyToken = async () => {
    const user_data = get(auth_user)
    if (!user_data) {
        throw new Error("User is not defined")
    }
    //not sure if I should force refresh here
    await user_data.user.getIdToken(true).then(async (decoded_token)=> {
        admin_auth.auth().verifyIdToken(decoded_token, true).catch(()=> {
            throw new Error("Invalid ID Token")
        })
    }).catch(err => {
        throw err
    })

}

export const convertRoleToClaim = async (role: Roles) => {
    switch (role) {
        case Roles.ADMIN:
            return {
                admin: true
            }
        case Roles.TECHNICIAN:
            return {
                technician: true
            }
        case Roles.ENDUSER:
            return {
                enduser: true
            }
        default:
            throw new Error("Invalid Role")
    }
}
