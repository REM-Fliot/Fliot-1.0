<script>
	import { onMount } from 'svelte';
	import CurrentChat from '../../../../components/Current_Chat.svelte';
	import Spinner from '../../../../components/Spinner.svelte';
	import { invalidateAll } from '$app/navigation';
	import { client_auth, db } from '$lib/firebase/firebase';
	import { current_company } from '../../../../store/authStores';
	import { onSnapshot, collection } from 'firebase/firestore';

	export let data;
	$: loaded = data.loaded;
	$: messages = data.messages;
	$: chat_id = data.chat_id;

	onMount(async () => {
		if (!loaded) {
			if ($current_company && client_auth.currentUser) {
				const doc_ref = collection(db, 'companies', $current_company, 'assets', chat_id, 'chat');
				onSnapshot(doc_ref, async () => {
					console.log('Change in DB!');
					console.log(messages);
					// querySnapshot.forEach((doc) => {
					// 	messages = messages.concat(doc);
					// });
					// console.log('added new message');
					await invalidateAll();
				});
			}
		}
	});
</script>

{#if !loaded}
	<Spinner />
{:else}
	<CurrentChat {messages} {chat_id} />
{/if}
