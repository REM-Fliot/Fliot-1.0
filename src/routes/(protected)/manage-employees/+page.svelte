<!-- <script lang="ts">
	import {addDoc, deleteDoc, collection, doc, updateDoc} from "firebase/firestore/lite";
	import { auth_user } from "../../../store/authUser";
	import { auth, db } from "$lib/firebase/firebase";
    import { goto, invalidateAll } from "$app/navigation";
    import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore/lite";
	import { onMount } from "svelte";
	import type { PageData } from "./$types";

    export let data
    const company = data.company
    $: employees = data.employees
    console.log(employees)
    let global_modifying: boolean;
    const col_ref = collection(db,"companies", company,"employees")
    //---BINDED---
    let username_update:string

    onMount(()=>{
        global_modifying = false
    })

    const handleDelete = async (uid:string) => {
        await deleteDoc(doc(db,"companies", company,"employees",uid))
        await invalidateAll()
    }
    const handleModify = async(employee:QueryDocumentSnapshot<DocumentData>)=>{
        const data = employee.data()
        username_update = data.USERNAME
        employee.is_modifying = true
        global_modifying = true;
    }
    const handleUpdate = async(employee:QueryDocumentSnapshot<DocumentData>) => {
        await updateDoc(doc(db,"companies", company,"employees",employee.id), {
            USERNAME: username_update
        })
        await invalidateAll()
        employee.is_modifying=false
        global_modifying = false;
    }

</script>
<h1>{company}'s employees</h1>
{#each employees as employee}
    <div class="employee">
        {#if employee.is_modifying}
            <form on:submit={()=>{handleUpdate(employee)}}>
                <label>Name: <input type = "text" placeholder = "Name" bind:value={username_update}></label>
                <button>Update</button>
            </form>
        {:else}
            <div>Name: {employee.data().USERNAME} </div> 
        {/if}
        <div>Email: {employee.data().EMAIL}</div>
        <button on:click={()=>handleDelete(employee.id)}>Delete</button>
        {#if !global_modifying}
            <button on:click={()=>handleModify(employee)}>Modify</button>
        {/if}

        
    </div>
{/each}

<style>
    .employee {
        margin: 0.5rem 0rem;
        padding: 0.25rem;
        /* border: 3px solid black; */
    }
</style> -->
