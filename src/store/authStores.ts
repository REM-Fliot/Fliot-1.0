import { client_auth } from '$lib/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { writable, readable } from 'svelte/store';
import type { User } from 'firebase/auth';

//See https://svelte.dev/tutorial/writable-stores

type UserExtended = {
	user: User;
	company: string;
};

//Add authentication stores here
export const creating_company = writable<boolean>(false);

export const loaded = writable<boolean>(false);
export const current_company = writable<string | null>(undefined);
