import { createUserWithEmailAndPassword, getIdToken, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { writable,readable } from "svelte/store";
import { auth } from "../lib/firebase/firebase";
import { goto } from "$app/navigation";
import type { User } from "firebase/auth";
// import { setUser } from "./user";


//See https://svelte.dev/tutorial/writable-stores


export const is_loading = writable(true);

// export const user = readable(user: User | null)


export const authHandlers = {
    signup: async (email: string, pass:string) => {
        await createUserWithEmailAndPassword(auth, email, pass).then(
            async (user_credentials)=>{
                // const token = await user_credentials.user.getIdToken()
                //     const user = await fetch('/auth', {
                //         method: 'POST',
                //         headers: {
                //             authorization: `Bearer ${token}`,
                //         },
                //     }).then((res) => res.json())
                // setUser(user)
                goto("/dashboard")
            }
        ).catch((err)=>{
            console.log(err)
        })
    },
    login: async (email: string, pass:string) => {
        await signInWithEmailAndPassword(auth, email, pass).then(
            async (user_credentials)=>{
                // const token = await user_credentials.user.getIdToken()
                //     const user = await fetch('/auth', {
                //         method: 'POST',
                //         headers: {
                //             authorization: `Bearer ${token}`,
                //         },
                //     }).then((res) => res.json())
                // setUser(user)
                goto("/dashboard")
            }
        ).catch((err)=>{
            console.log(err)
        })
        
    },
    logout: async () => {
        await signOut(auth).then(()=>{
            goto("/login")
        }).catch((err)=>{
            console.log(err)
        })
        
        
    }
}
