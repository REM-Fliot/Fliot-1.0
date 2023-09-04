<script lang="ts">
	import type { Unsubscribe } from 'firebase/auth';
	import { onDestroy, onMount } from 'svelte';
	import { adminListener } from '../../auth/auth-listeners';
	import Navbar from '../../components/Navbar.svelte';

	let unsubscribe: Unsubscribe | null = null;
	//Listens to changes in IS_ADMIN for current user
	onMount(async () => {
		unsubscribe = await adminListener();
	});

	onDestroy(() => {
		if (unsubscribe !== null) {
			console.log('unsubscribing from admin listener');
			unsubscribe();
		}
	});
</script>

<Navbar />
<slot />
