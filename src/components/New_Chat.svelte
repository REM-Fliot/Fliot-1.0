<script lang="ts">
    import { db } from "$lib/firebase/firebase";
	import { addDoc, collection, doc, setDoc } from "firebase/firestore/lite";
	import { auth_user } from "../store/authUser";
	import { getEmployeeById } from "../utility/get-employee-by-id";
	import { page } from "$app/stores";
	import { error } from "@sveltejs/kit";
	export let specifyEmail

    let user_input = '';
    let err = '';

	async function handleCreateNewChat(event) {
		event.preventDefault();
        const company_name = $auth_user?.company
        let id_key
        if (!specifyEmail) {
            id_key = $auth_user?.user.uid
        }
        else {
            try {
                id_key = await getEmployeeById(company_name, user_input)
            }
            catch (e) {
                err = e ;
                return
            }
            
        }
		await setDoc(doc(db, "companies", company_name,"chats",id_key), {
            TECHNICIAN_COMPANY: company_name,
            USER_COMPANY: company_name,
            USER: id_key
        });
        console.log("successfully created")
    }
</script>
<h1>New Chat</h1>
<div class="new_chat">
	<form on:submit={handleCreateNewChat}>
        {#if specifyEmail}
            <label>
                <input bind:value={user_input} id="user_input" type="text" placeholder="Specify end user to send to start chat with" />
            </label>
        {/if}
        <button id="submit" type="submit">Create Chat</button>
	</form>
</div>
<span>{err}</span>

<style>
    #user_input {
        width: 30%;
    }
</style>
