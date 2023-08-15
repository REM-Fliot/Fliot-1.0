import { get } from "svelte/store";
import { auth_user } from "../../../../../store/authUser";
import { fetchAssets, fetchEmployees, fetchFsrTemplates } from "../../../../../utility/fetch_data";
import { error } from '@sveltejs/kit';
import type { PageLoad } from "../../../firestore/$types";
import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore/lite";




/** @type {import('./$types').PageLoad} */
export const load: PageLoad = async () => {
    console.log("LOADED")
    const company = get(auth_user)?.company
    console.log(get(auth_user))

    let loaded = false
    let assets: QueryDocumentSnapshot<DocumentData>[] = []
    let templates: QueryDocumentSnapshot<DocumentData>[] = []
    if (company) {
        assets = await fetchAssets(company);
        templates = await fetchFsrTemplates(company)
        loaded = true
    }
    
    return {
        assets: assets,
        templates: templates,
        loaded: loaded
    };
}