import { writable } from 'svelte/store';
import type { UserType } from '../types';

//See https://svelte.dev/tutorial/writable-stores

//Add authentication stores here
export const creating_company = writable<boolean>(false);

export const loaded = writable<boolean>(false);
export const current_company = writable<string | null>(undefined);
export const technician_company = writable<string | null>(undefined);
export const is_admin = writable<boolean | null>(undefined);
export const user_type = writable<UserType | null>(undefined);

export const unsubscribe_list = writable([]);
