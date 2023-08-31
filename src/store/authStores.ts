import type { User } from 'firebase/auth';
import { writable } from 'svelte/store';
import type { Claims } from '../types';

//See https://svelte.dev/tutorial/writable-stores

type UserExtended = {
	user: User;
	company: string;
};

//Add authentication stores here
export const creating_company = writable<boolean>(false);

export const loaded = writable<boolean>(false);
export const current_company = writable<string | null>(undefined);
export const roles = writable<Claims | null>(undefined);
