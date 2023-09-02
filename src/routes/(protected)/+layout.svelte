<script lang="ts">
	import { onDestroy } from 'svelte';
	import { adminListener } from '../../auth/auth-listeners';
	import Navbar from '../../components/Navbar.svelte';

	//Listens to changes in IS_ADMIN for current user
	const unsubscribe = adminListener();

	onDestroy(() => {
		if (unsubscribe !== null) {
			console.log('unsubscribing from admin listener');
			unsubscribe();
		}
	});
</script>

<Navbar />
<slot />
