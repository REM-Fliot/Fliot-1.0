import { client_auth } from "$lib/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { writable, readable } from "svelte/store";
import type { User } from "firebase/auth";


//See https://svelte.dev/tutorial/writable-stores

type UserExtended = {
    user: User
    company: string
}

//Add authentication stores here
export const auth_user = writable<UserExtended|null>(undefined)
export const creating_company = writable<boolean>(false)

export const loading = writable<boolean>(false)
