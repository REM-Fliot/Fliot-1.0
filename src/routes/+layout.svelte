<script lang="ts">
	import { onMount } from 'svelte';
	import { client_auth, db } from '../lib/firebase/firebase';
	import { onAuthStateChanged } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Spinner from '../components/Spinner.svelte';
	import { creating_company, current_company, loaded } from '../store/authStores';
	import { collection, doc, getDoc } from 'firebase/firestore';
	import { browser } from '$app/environment';
	import { error } from '@sveltejs/kit';
	import resolveUser from '../auth/resolve-user';

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
