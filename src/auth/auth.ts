import { createUserWithEmailAndPassword, getIdToken, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../lib/firebase/firebase";
import { goto } from "$app/navigation";
import type { User } from "firebase/auth";
import { auth_user } from "../store/authUser";

export const authHandlers = {
    signup: async (email: string, pass:string) => {
        await createUserWithEmailAndPassword(auth, email, pass).then(
            async (user_credentials)=>{
                // auth_user.set(user_credentials.user)        
                await goto("/dashboard")
            }
        ).catch((err)=>{
            console.log(err)
        })
    },
    login: async (email: string, pass:string) => {
        await signInWithEmailAndPassword(auth, email, pass).then(
            async (user_credentials)=>{
                // auth_user.set(user_credentials.user)
                await goto("/dashboard")
            }
        ).catch((err)=>{
            console.log(err)
        })
        
    },
    logout: async () => {
        await signOut(auth).then(async ()=>{
            auth_user.set(null)
            await goto("/login")
        }).catch((err)=>{
            console.log(err)
        })
        
        
    }
}
