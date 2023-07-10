<script lang="ts">
	import {addDoc, deleteDoc, collection, doc} from "firebase/firestore/lite";
	import { auth_user } from "../../../store/authUser";
	import reroute from "../../../utility/reroute";
	import { db } from "$lib/firebase/firebase";
    import { invalidate, invalidateAll } from "$app/navigation";
    import type { DocumentData } from "firebase/firestore/lite";

    export let data
    $: assets = data.assets

    const col_ref = collection(db,"assets")
    //---BINDED---
    let asset_name_post:string
    let client_name_post:string
    let date_post: Date | null

    const handleSubmit = async () => {
        console.log(asset_name_post,client_name_post,date_post)
        await addDoc(col_ref, {
            ASSET_NAME: asset_name_post,
            CLIENT_NAME: client_name_post,
            DATE: date_post
        }).then(async ()=>{
            console.log("submitting...")
            asset_name_post = "";
            client_name_post = "";
            date_post = null;
            await invalidateAll()
        })

    }

    const handleDelete = async (asset_id:string) => {
        await deleteDoc(doc(db,"assets",asset_id))
        await invalidateAll()
    }

</script>
<button on:click={()=>{reroute("dashboard")}}>Go back to dashboard</button>
<h1>Welcome, {$auth_user?.email}</h1>
<h2>New asset registrations</h2>
<form on:submit={handleSubmit}>
    <label>Asset name<input type = "text" placeholder = "Asset name" bind:value={asset_name_post}></label>
    <br/>
    <label>Client name<input type = "text" placeholder = "Client name" bind:value={client_name_post}></label>
    <br/>
    <label>Date of service<input type = "date" placeholder = "Date of service" bind:value={date_post}></label>
    <br/>
    <button>Assign</button>
</form>
<!-- <button on:click={retrieveData}></button> -->
<h1>Registered Assets</h1>
{#each assets as asset}
    <!-- {console.log(asset.data().ASSET_NAME)} -->
    <div class="asset">
        <h2>Asset Name: {asset.data().ASSET_NAME}</h2>
        <div>Client Name: {asset.data().CLIENT_NAME}</div>
        <div>Date: {asset.data().DATE}</div>
        <button on:click={()=>handleDelete(asset.id)}>Delete</button>
    </div>
{/each}

<style>
    .asset {
        margin: 0.5rem 0rem;
        padding: 0.25rem;
        /* border: 3px solid black; */
    }
</style>
