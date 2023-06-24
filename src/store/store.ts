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

export class Asset {
    constructor(name:string, id:string, sector:string) {
        this.name = name;
        this.id = id;
        this.sector = sector;
    }
}

export const Asset_list = [
    new Asset('Magnetic Resonance Imaging (MRI) Scanner', '598', 'Radiology'),
    new Asset('Computed Tomography (CT) Scanner', '326', 'Radiology'),
    new Asset('Linear Accelerator (LINAC)', '721', 'Oncology'),
    new Asset('Positron Emission Tomography (PET) Scanner', '492', 'Nuclear Medicine'),
    new Asset('Robotic Surgical System', '185', 'Surgery'),
    new Asset('Gamma Camera', '622', 'Nuclear Medicine'),
    new Asset('Lithotripsy Machine', '851', 'Urology')
]
