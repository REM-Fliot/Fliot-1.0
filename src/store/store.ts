import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { writable } from "svelte/store";
import { auth } from "../lib/firebase/firebase";

//See https://svelte.dev/tutorial/writable-stores

export const authStore = writable({
    email: "",
})

export const authHandlers = {
    signup: async (email: string, pass:string) => {
        await createUserWithEmailAndPassword(auth,email,pass)
    },
    login: async (email: string, pass:string) => {
        await signInWithEmailAndPassword(auth, email, pass)
    },
    logout: async () => {
       await signOut(auth)
    }
}
