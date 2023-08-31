<script lang="ts">
	import { onAuthStateChanged } from 'firebase/auth';
	import resolveUser from '../auth/resolve-user';
	import Spinner from '../components/Spinner.svelte';
	import { client_auth } from '../lib/firebase/firebase';
	import { loaded } from '../store/authStores';

	//The below function runs each time the user auth state changes
	onAuthStateChanged(client_auth, resolveUser);
</script>

<div>
	{#if !$loaded}
		<Spinner />
	{:else}
		<slot />
	{/if}
</div>
