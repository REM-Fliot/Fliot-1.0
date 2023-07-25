<script lang="ts">
	import {addDoc, deleteDoc, collection, doc, updateDoc} from "firebase/firestore/lite";
	import { auth_user } from "../../../store/authUser";
	import { db } from "$lib/firebase/firebase";
    import { goto, invalidateAll } from "$app/navigation";
    import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore/lite";
	import { onMount } from "svelte";
    import { Asset_list, Asset, FetchData } from "../../../store/asset";

    export let data
    $: assets = data.assets
    let global_modifying: boolean;
    const col_ref = collection(db,"assets")
    //---BINDED---
    let asset_name_post:string
    let client_name_post:string
    let asset_location_post: string
    let date_post: Date | null

    let asset_name_update:string
    let client_name_update:string
    let asset_location_update: string
    let date_update: Date | null

    onMount(()=>{
        global_modifying = false
    })
    const handleSubmit = async () => {
        console.log(asset_name_post,client_name_post,date_post)
        await addDoc(col_ref, {
            ASSET_NAME: asset_name_post,
            CLIENT_NAME: client_name_post,
            ASSET_LOCATION: asset_location_post,
            ASSET_ID: Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000,
            DATE: date_post
        }).then(async ()=>{
            console.log("submitting...")
            asset_name_post = "";
            client_name_post = "";
            asset_location_post = ""
            date_post = null;
            await invalidateAll()
        })
        await FetchData()
    }

    const handleDelete = async (asset_id:string) => {
        await deleteDoc(doc(db,"assets",asset_id))
        await invalidateAll()
        await FetchData()
    }
    const handleModify = async(asset:QueryDocumentSnapshot<DocumentData>)=>{
        const data = asset.data()
        asset_name_update = data.ASSET_NAME
        client_name_update = data.CLIENT_NAME
        asset_location_update = data.ASSET_LOCATION
        date_update = data.DATE
        asset.is_modifying = true
        global_modifying = true;
        await FetchData()
    }
    const handleUpdate = async(asset:QueryDocumentSnapshot<DocumentData>) => {
        await updateDoc(doc(db,"assets",asset.id), {
            ASSET_NAME: asset_name_update,
            CLIENT_NAME: client_name_update,
            ASSET_LOCATION: asset_location_update,
            DATE: date_update
        })
        await invalidateAll()
        asset.is_modifying=false
        global_modifying = false;
        await FetchData()
    }

</script>
<button on:click={async ()=>{await goto("dashboard")}}>Go back to dashboard</button>
<h1>Welcome, {$auth_user?.email}</h1>
<h2>New asset registrations</h2>
<form on:submit={handleSubmit}>
    <label>Asset name: <input type = "text" placeholder = "Asset name" bind:value={asset_name_post}></label>
    <br/>
    <label>Client name: <input type = "text" placeholder = "Client name" bind:value={client_name_post}></label>
    <br/>
    <label>Asset location: <input type = "text" placeholder = "Asset location" bind:value={asset_location_post}></label>
    <br/>
    <label>Date of service: <input type = "date" placeholder = "Date of service" bind:value={date_post}></label>
    <br/>
    <button>Assign</button>
</form>
<h1>Registered Assets</h1>
{#each assets as asset}
    <div class="asset">
        {#if asset.is_modifying}
            <form on:submit={()=>{handleUpdate(asset)}}>
                <h1><label>Asset name: <input type = "text" placeholder = "Asset name" bind:value={asset_name_update}></label></h1>
                <br/>
                <label>Client name: <input type = "text" placeholder = "Client name" bind:value={client_name_update}></label>
                <br/>
                <label>Asset location: <input type = "text" placeholder = "Asset location" bind:value={asset_location_update}></label>
                <br/>
                <label>Date of service: <input type = "date" placeholder = "Date of service" bind:value={date_update}></label>
                <br/>
                <button>Update</button>
            </form>
        {:else}
            <h2>Asset Name: {asset.data().ASSET_NAME} </h2> 
            <div>Client Name: {asset.data().CLIENT_NAME}</div>
            <div>Asset Location: {asset.data().ASSET_LOCATION}</div>
            <div>Date: {asset.data().DATE}</div>
            <button on:click={()=>handleDelete(asset.id)}>Delete</button>
            {#if !global_modifying}
                <button on:click={()=>handleModify(asset)}>Modify</button>
            {/if}
        {/if}

        
    </div>
{/each}

<style>
    .asset {
        margin: 0.5rem 0rem;
        padding: 0.25rem;
        /* border: 3px solid black; */
    }
</style>
