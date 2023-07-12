import { auth } from "$lib/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { writable, readable } from "svelte/store";
import type { User } from "firebase/auth";


//See https://svelte.dev/tutorial/writable-stores

//Add authentication stores here
export const auth_user = writable<User|null>(undefined)
