import { createUserWithEmailAndPassword, getIdToken, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { writable,readable } from "svelte/store";
import { auth } from "../lib/firebase/firebase";
import { goto } from "$app/navigation";
import type { User } from "firebase/auth";


//See https://svelte.dev/tutorial/writable-stores

export const user = readable<User | null>(
    undefined,
    set => onAuthStateChanged(auth, (user)=>{
        set(user)
    })
  )


export const authHandlers = {
    signup: async (email: string, pass:string) => {
        await createUserWithEmailAndPassword(auth, email, pass).then(
            (user_credentials)=>{
                const user = user_credentials.user
                // authUser.set({
                //     uid: user_credentials.user.uid,
                //     email: user_credentials.user.email || ''
                //   });
                goto("/dashboard")
            }
        ).catch((err)=>{
            console.log(err)
        })
    },
    login: async (email: string, pass:string) => {
        await signInWithEmailAndPassword(auth, email, pass).then(
            (user_credentials)=>{
                const user = user_credentials.user
                // authUser.set({
                //     uid: user_credentials.user.uid,
                //     email: user_credentials.user.email || ''
                // });
                localStorage.setItem("uid", user.uid)
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
