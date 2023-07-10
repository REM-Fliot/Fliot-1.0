import fetchAssets from "../../../utility/fetch_assets";




/** @type {import('./$types').PageLoad} */
export const load = async (PageLoadEvent) => {

    let assets = await fetchAssets();
    
    return {
        assets
    };
}
