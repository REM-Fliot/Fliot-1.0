import { createUserWithEmailAndPassword, getAuth, getIdToken, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../lib/firebase/firebase";
import { goto } from "$app/navigation";
import type { User } from "firebase/auth";
import { auth_user, creating_company } from "../store/authUser";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore/lite";
import { get } from "svelte/store";



export const clientAuthHandlers = {
    addCompany: async (email: string, pass:string, company_name: string) => {
        await createUserWithEmailAndPassword(auth, email, pass).then(async (user_credentials)=>{
            auth_user.set({user: user_credentials.user, company: company_name})  //Dont think this should be set here   
            const email = user_credentials.user.email
            await addDoc(collection(db, "companies", company_name,"assets"), {
                ASSET_NAME: "PLACEHOLDER",
                CLIENT_NAME: "PLACEHOLDER",
                DATE: "PLACEHOLDER"
            });
            // auth.set
            await setDoc(doc(db, "companies", company_name,"employees",user_credentials.user.uid), {
                EMAIL: user_credentials.user.email,
                USERNAME: "ADMIN",
                ADMIN: true
            });
            await setDoc(doc(db, "users", user_credentials.user.uid), {
                EMAIL: email,
                COMPANY: company_name
            });
            
            
            await goto("/dashboard")
        }).catch((err)=>{
            console.log(err)
            throw err
        })
    },
    login: async (email: string, pass:string) => {
        await signInWithEmailAndPassword(auth, email, pass).then(
            async (user_credentials)=>{
                let company
                const user = user_credentials.user
                const col_ref = doc(db, "users", user.uid)
                await getDoc(col_ref).then(snapshot=>{
                    company = snapshot.data()?.company
                })
                .catch(()=>{
                    console.log("No user exists with that id")
                })
                if (company) {
                    auth_user.set({user: user, company: company})
                }
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
