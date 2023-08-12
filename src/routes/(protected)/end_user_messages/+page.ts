import { get } from "svelte/store";
import { auth_user } from "../../../store/authUser";
import {fetchAssets, fetchChats, fetchEmployees} from "../../../utility/fetch_data";
import { error } from '@sveltejs/kit';
import type { PageLoad } from "../firestore/$types";
import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore/lite";


/** @type {import('./$types').PageLoad} */
export const load: PageLoad = async () => {
    console.log("LOADED")
    const company = get(auth_user)?.company

    let loaded = false
    let chats: QueryDocumentSnapshot<DocumentData>[] = []
    if (company) {
        chats = await fetchChats(company);
        loaded = true
    }

    
    return {
        chats: chats,
        loaded: loaded
    };
}
