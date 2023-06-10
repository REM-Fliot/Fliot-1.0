<script>
	import { get } from "svelte/store";


	import { authHandlers, authStore } from "../../store/store";
	import { auth } from "$lib/firebase/firebase";
	let email = null
	auth.onAuthStateChanged((user) => {
		if (user) {
			email = user.email
			// ...
		} else {
			//Shouldn't occur
			return
		}
	})

</script>
{#if email}
	<h2>Welcome, {email}</h2>
{/if}

<button on:click={authHandlers.logout}>LOGOUT</button>
