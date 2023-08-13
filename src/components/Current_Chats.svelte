<script lang="ts">
	import type { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore/lite';
	import { current_company } from '../store/authStores';
	import Spinner from './Spinner.svelte';

	export let chats: QueryDocumentSnapshot<DocumentData>[];
	const company = $current_company!.company;

	async function handleDelete(event: any) {
		console.log('DELETE NOT READY YET');
	}
</script>

<h1>Current Chats</h1>
{#each chats as chat}
	<div class="chats">
		<a data-sveltekit-preload-data="hover" href="/messages/{chat.id}"
			><button>
				<div>Chat Between {chat.data().USER} and {chat.data().TECHNICIAN_COMPANY}</div>
				{#if !chat.data().ADMIN}
					<button on:click={() => handleDelete(chat.id)}>Delete</button>
				{/if}
			</button></a
		>
	</div>
{/each}
