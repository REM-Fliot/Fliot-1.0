import fetchAssets from "../utility/fetch_assets";
import data from "../routes/(protected)/firestore/+page.svelte"
import { onMount } from "svelte";
import { writable } from "svelte/store";

/** @type {import('./$types').PageLoad} */
export const FetchData = async () => {
    let assets
    let asset_list_temp = []
    assets = await fetchAssets();
    // console.log("here: ", assets[0].data().ASSET_NAME)
    for(let i = 0; i < assets.length; i++){
        const asset = assets[i].data()
        asset_list_temp.push(new Asset(asset.ASSET_NAME, asset.ASSET_ID, asset.CLIENT_NAME, asset.ASSET_LOCATION))
    }
    Asset_list.set(asset_list_temp);
    // return {
    //     asset_list_temp
    // };
}

export class Asset {
    constructor(name:string, id:number, client:string, location:string) {
        this.name = name;
        this.id = id;
        this.client = client;
        this.location = location;
    }
}

// export let Asset_list = writable([]);

export let Asset_list = writable([])
FetchData()
// console.log($Asset_list)


// new Asset('Magnetic Resonance Imaging (MRI) Scanner', '598', 'Radiology', 'HrM Hospital', 'Operating block'),
    // new Asset('Computed Tomography (CT) Scanner', '326', 'Radiology', 'Credit Valley Hospital', "Main floor"),
    // new Asset('Linear Accelerator (LINAC)', '721', 'Oncology', 'New Age Clinic', "Second floor"),
    // new Asset('Positron Emission Tomography (PET) Scanner', '492', 'Nuclear Medicine', 'Credit Valley Hospital', "Operating block"),
    // new Asset('Robotic Surgical System', '185', 'Surgery','HrM Hospital', "Main floor"),
    // new Asset('Gamma Camera', '622', 'Nuclear Medicine', 'HrM Hospital', "Second floor"),
    // new Asset('Lithotripsy Machine', '851', 'Urology', 'New Age Clinic', "Operating block")

// Asset_list.set()


export const UpdateArray = () => {
    // let assets
    // assetsPromise.then((result) => {
    //     assets = result.assets
    //     for(let i = 0; i < assets.length; i++){
    //         let asset = assets[i].data()
    //         console.log(asset)
    //         Asset_list.update((current_value) => {
    //             const updated_array = [...current_value, new Asset(asset.ASSET_NAME, '889', "RANDOM", asset.CLIENT_NAME, "new block")]
    //             return updated_array;
    //         })
    //     }  
    // })
}


