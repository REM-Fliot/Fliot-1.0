<script lang="ts">
	import { page } from '$app/stores';
	import type { Unsubscribe } from 'firebase/auth';
	import { onDestroy, onMount } from 'svelte';
	import { adminListener } from '../../auth/auth-listeners';
	import Navbar from '../../components/navigation/Navbar.svelte';
	import TitleNavbar from '../../components/navigation/TitleNavbar.svelte';
	import { routeToTitle } from '../../utility/misc';

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

	$: route = $page.route.id;
	$: title = routeToTitle(route!);
</script>

<div class="flex flex-row w-screen">
	<div class="w-1/6">
		<Navbar />
	</div>
	<div class="w-5/6 block px-10 py-5">
		<TitleNavbar>{title}</TitleNavbar>
		<slot />
	</div>
</div>
