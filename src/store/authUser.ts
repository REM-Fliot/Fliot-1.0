import { writable } from "svelte/store";


//See https://svelte.dev/tutorial/writable-stores

//Add authentication stores here
export const is_loading = writable(true);
