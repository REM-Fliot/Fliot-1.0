<script lang="ts">
	import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
	import type { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
	import { current_company } from '../store/authStores';
	import Spinner from './Spinner.svelte';
	import { client_auth, db } from '$lib/firebase/firebase';
	import { invalidateAll } from '$app/navigation';

	export let messages: QueryDocumentSnapshot<DocumentData>[];
	export let chat_id: string;
	const company_name = $current_company;
	const username = client_auth.currentUser?.displayName;
	let message_text = '';

	const company = $current_company!;

	const handleSendMessage = async (event: any) => {
		const unix_time = Date.now();
		const date = new Date(unix_time);
		const current_time = date.toLocaleTimeString();
		await addDoc(collection(db, 'companies', company, 'assets', chat_id, 'chat'), {
			TIME_CREATED: current_time,
			SENT_BY: client_auth.currentUser?.uid,
			USERNAME: client_auth.currentUser?.displayName,
			COMPANY: $current_company,
			CONTENT: message_text
		});
		message_text = '';
		// invalidateAll();
	};
	const handleDelete = async (message_id: string) => {
		await deleteDoc(doc(db, 'companies', company, 'assets', chat_id, 'chat', message_id));
		// await invalidateAll();
		// await FetchData()
	};
</script>

<h1>Chat Messages</h1>
<div class="messages">
	{#each messages as message}
		{#if message.data().SENT_BY === client_auth.currentUser?.uid}
			<div class="right_side">
				<div>Sent By: {message.data().USERNAME}</div>
				<div>Time: {message.data().TIME_CREATED}</div>
				<div id="blue_text">{message.data().CONTENT}</div>
				<button on:click={() => handleDelete(message.id)}>Delete</button>
			</div>
		{:else}
			<div class="left_side">
				<div>Sent By: {message.data().USERNAME}</div>
				<div>Time: {message.data().TIME_CREATED}</div>
				<div id="green_text">{message.data().CONTENT}</div>
			</div>
		{/if}
	{/each}
</div>
<form on:submit={handleSendMessage}>
	<label>
		<input
			bind:value={message_text}
			id="message_text"
			type="text"
			placeholder="Type your message here" />
	</label>
	<button id="submit" type="submit"> Submit </button>
</form>

<style>
	#message_text {
		width: 100%;
	}
	/* .right_side {
		margin-left: auto;
		margin-right: 0;
	} */
	.messages {
		/* display: flex;
		justify-content: flex-end; */
		border: black 2px solid;
		margin: 3rem;
	}
	.right_side {
		padding-top: 3rem;
		padding-bottom: 3rem;
		padding-right: 5rem;
		margin-left: auto;
		margin-right: 0;
		width: 15rem;
		/* float: right; */
		/* text-align: right;
		display: inline-block; */
	}
	.left_side {
		padding-top: 3rem;
		padding-bottom: 3rem;
		padding-left: 5rem;
		margin-right: auto;
		margin: 0;
		width: 15rem;
	}
	#green_text {
		background-color: limegreen;
		padding: 0.5rem;
		border-radius: 0.5rem;
	}
	#blue_text {
		background-color: dodgerblue;
		padding: 0.5rem;
		border-radius: 0.5rem;
	}
</style>
