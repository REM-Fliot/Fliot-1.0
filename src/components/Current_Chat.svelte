<script lang="ts">
	import { addDoc, collection, type DocumentData, type QueryDocumentSnapshot } from "firebase/firestore/lite";
	import { auth_user } from "../store/authUser";
	import Spinner from "./Spinner.svelte";
	import { db } from "$lib/firebase/firebase";

    
	export let messages
    export let chat_id
    const company_name = $auth_user!.company
    const username = $auth_user?.user.displayName
    let message_text = '';
    
    async function handleSendMessage(event: any) {
        // const current_time = Date.now();
        // await addDoc(collection(db, "companies", company_name,"chats",chat_id,"messages"), {
        //     TIME_CREATED: current_time,
        //     SENT_BY_COMPANY,
        //     USERNAME: username,
        //     COMPANY: company_name,
        // });
            // // auth.set
            // await setDoc(doc(db, "companies", company_name,"employees",user_credentials.user.uid), {
            //     EMAIL: user_credentials.user.email,
            //     USERNAME: "ADMIN",
            //     ADMIN: true
            // });
            // await setDoc(doc(db, "users", user_credentials.user.uid), {
            //     EMAIL: email,
            //     COMPANY: company_name
            // });
    }

</script>

<h1>Chat Messages</h1>
{#each messages as message}
    <div class="messages">

        
    </div>
{/each}
<form on:submit={handleSendMessage}>
    <label>
        <input bind:value={message_text} id="message_text" type="text" placeholder="Type your message here" />
    </label>
    <button id="submit" type="submit"> Submit </button>
</form>

<style>
    #message_text {
        width: 100%;
    }
</style>

