<script lang="ts">
	import { onMount } from 'svelte';
	import { client_auth, db } from '../lib/firebase/firebase';
	import { onAuthStateChanged } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Spinner from '../components/Spinner.svelte';
	import { creating_company, current_company, loaded } from '../store/authStores';
	import { collection, doc, getDoc } from 'firebase/firestore/lite';
	import { browser } from '$app/environment';
	import { error } from '@sveltejs/kit';
	import resolveUser from '../auth/resolve-user';

	//All routes under the (protected) folder
	let protected_route = $page.route.id?.startsWith('/(protected)');

	onAuthStateChanged(client_auth, resolveUser);
</script>

<div>
	{#if !$loaded}
		<Spinner />
	{:else}
		<slot />
	{/if}
</div>
