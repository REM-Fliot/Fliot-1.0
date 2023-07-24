import { get } from "svelte/store";
import { auth_user } from "../../../store/authUser";
import {fetchAssets} from "../../../utility/fetch_data";
import { error } from '@sveltejs/kit';
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {

    const company = get(auth_user)?.company

    if (!company) throw error(400, "No company associated with this account")

    const assets = await fetchAssets(company);

    return {
        assets: assets,
        company: company
    };
}
