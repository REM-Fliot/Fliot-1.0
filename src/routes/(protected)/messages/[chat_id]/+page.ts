import { get } from "svelte/store";
import { auth_user } from "../../../../store/authUser";
import {fetchAssets, fetchEmployees} from "../../../../utility/fetch_data";
import { error } from '@sveltejs/kit';
import type { PageLoad } from "../../firestore/$types";
import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore/lite";
import { fetchMessages } from "../../../../utility/fetch_data";


/** @type {import('./$types').PageLoad} */
export const load: PageLoad = async ({params}) => {
    console.log("LOADED")
    console.log(params.chat_id)
    const company = get(auth_user)?.company

    let loaded = false
    let messages: QueryDocumentSnapshot<DocumentData>[] = []
    if (company) {
        messages = await fetchMessages(company,params.chat_id);
        loaded = true
    }

    
    return {
        messages: messages,
        chat_id: params.chat_id,
        loaded: loaded
    };
}
