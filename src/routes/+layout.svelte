<script lang="ts">
	import { onMount } from 'svelte';
	import { auth } from '../lib/firebase/firebase';
	import { onAuthStateChanged } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Spinner from '../components/Spinner.svelte';
	import { is_loading } from '../store/authUser';

	//All routes under the (protected) folder
	let protected_route = $page.route.id?.startsWith('/(protected)');

	//onMount = immediately when the page renders
	onMount(() => {
		onAuthStateChanged(auth, async (user) => {
			//onAuthStateChanged = when the user variable is resolve - either it is null (not signed in), or User object.
			if (protected_route) {
				if (!user) {
					//Not logged in but trying to access protected routes
					await goto('/login');
				}
			} else {
				if (user) {
					//Logged in but trying to access the login page
					await goto('/dashboard');
				}
			}
			is_loading.set(false);
		});
	});
</script>

<div>
	{#if $is_loading}
		<Spinner />
	{:else}
		<slot />
	{/if}
</div>
