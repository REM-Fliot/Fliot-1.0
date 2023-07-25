import { get } from "svelte/store";
import { auth_user } from "../../../store/authUser";
import {fetchEmployees} from "../../../utility/fetch_data";
import { error } from '@sveltejs/kit';
import type { PageLoad } from "../firestore/$types";
import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore/lite";




/** @type {import('./$types').PageLoad} */
export const load: PageLoad = async () => {
    const company = get(auth_user)?.company

    let loaded = false
    let employees: QueryDocumentSnapshot<DocumentData>[] = []
    if (company) {
        employees = await fetchEmployees(company);
        loaded = true
    }

    
    return {
        employees: employees,
        loaded: loaded
    };
}
