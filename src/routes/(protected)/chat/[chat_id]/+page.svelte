<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { db } from '$lib/firebase/firebase';
	import type { Unsubscribe } from 'firebase/auth';
	import { collection, doc, getDoc, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
	import { onDestroy, onMount } from 'svelte';
	import CurrentChat from '../../../../components/Current_Chat.svelte';
	import Spinner from '../../../../components/Spinner.svelte';
	import { current_company, user_type } from '../../../../store/authStores';
	import { UserType } from '../../../../types';

	export let data;
	let unsubscribe: Unsubscribe | null = null;
	$: local_loaded = data.local_loaded;
	$: messages = data.messages;
	$: chat_id = data.chat_id;

	let child_company: string | null = null;

	onMount(async () => {
		if (!local_loaded) {
			await invalidateAll();
		}
		console.log('grabbing messages');
		const asset_ref = doc(db, 'companies', $current_company!, 'assets', chat_id);
		if ($user_type === UserType.TECHNICIAN) {
			await getDoc(asset_ref).then((snapshot) => {
				if (!snapshot.exists()) {
					console.log('ID DOESNT EXIST??!?!');
					throw new Error('ID DOESNT EXIST?!?!?!?');
				}
				child_company = snapshot?.data().COMPANY;
			});
		}

		const chat_ref = collection(db, 'companies', $current_company!, 'assets', chat_id, 'chat');
		const q = query(chat_ref, orderBy('TIME_CREATED', 'desc'), limit(10));
		unsubscribe = onSnapshot(q, async (querySnapshot) => {
			console.log('Change in DB!');
			messages = [];
			querySnapshot.forEach((doc) => {
				console.log(doc.data());
				messages.push(doc);
			});
			messages.reverse();
			console.log('added new message');
		});
		console.log('successfully loaded');
		local_loaded = true;
	});

	onDestroy(() => {
		if (unsubscribe !== null) {
			console.log('unsubscribing from chat messages');
			unsubscribe();
		}
	});
</script>

{#if !local_loaded}
	<Spinner />
{:else}
	<CurrentChat {messages} {chat_id} {child_company} />
{/if}
