<script lang = "ts">
	import { authHandlers } from "../../../store/authstore";
	import { auth } from "$lib/firebase/firebase";
	import SearchFeature from "../../../components/Search_feature.svelte";

	let email = ""
	auth.onAuthStateChanged((user) => {
		if (user && user.email) {
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

<SearchFeature/>
