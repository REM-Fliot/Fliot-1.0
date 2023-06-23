import { createUserWithEmailAndPassword, getIdToken, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { writable } from "svelte/store";
import { auth } from "../lib/firebase/firebase";
import { request } from "../lib/fetch";
import { goto } from "$app/navigation";


//See https://svelte.dev/tutorial/writable-stores

export const authStore = writable({
    email: "",
})

export const authHandlers = {
    signup: async (email: string, pass:string) => {
        await createUserWithEmailAndPassword(auth,email,pass)
        // const id_token = await getIdToken(user_record.user,true)
        // await request("/auth", "POST", {id_token})
        goto("/dashboard")
    },
    login: async (email: string, pass:string) => {
        await signInWithEmailAndPassword(auth, email, pass)
        // const id_token = user_record.user.getIdToken()
        
        // const csrf_token = await 
        // await request("/auth", "POST", {id_token})
        goto("/dashboard")
    },
    logout: async () => {
       await signOut(auth)
       goto("/login")
    }
}
