import { get } from "svelte/store";
import { auth_user } from "../../../store/authUser";
import {fetchEmployees} from "../../../utility/fetch_data";
import { error } from '@sveltejs/kit';
import type { PageLoad } from "../firestore/$types";




/** @type {import('./$types').PageLoad} */
export const load: PageLoad = async () => {
    const company = get(auth_user)?.company


    // if (!company) throw error(400, "No company associated with this account")

    // const employees = await fetchEmployees(company);
    console.log(get(auth_user))
    return {
        // employees: employees,
        company: company
    };
}
