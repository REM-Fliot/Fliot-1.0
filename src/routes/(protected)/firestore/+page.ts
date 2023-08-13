import { get } from "svelte/store";
import {fetchAssets} from "../../../utility/fetch_data";
import type { PageLoad } from "./$types";
import { error } from '@sveltejs/kit';
import { auth_user} from "../../../store/authUser";
import { client_auth } from "$lib/firebase/firebase";
import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore/lite";

export const load: PageLoad = async () => {
    const company = get(auth_user)?.company

    let loaded = false;
    let assets: QueryDocumentSnapshot<DocumentData>[] = []

    if (company) {
        assets = await fetchAssets(company);
        loaded = true
    }
    
    return {
        assets: assets,
        loaded: loaded

    };
}
