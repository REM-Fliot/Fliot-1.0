import { get } from "svelte/store";
import { auth_user } from "../../../store/authUser";
import fetchAssets from "../../../utility/fetch_assets";




/** @type {import('./$types').PageLoad} */
export const load = async () => {
    let assets = await fetchAssets();
    
    return {
        assets
    };
}
