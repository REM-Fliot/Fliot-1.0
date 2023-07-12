<script lang = "ts">
	import { goto } from "$app/navigation";
	import { authHandlers } from "../../../auth/auth";
	import SearchFeature from "../../../components/Search_feature.svelte";
	import { auth_user } from "../../../store/authUser";

</script>

<button on:click={authHandlers.logout}>LOGOUT</button>

<SearchFeature/>

<a data-sveltekit-preload-data="hover" href="/firestore"><button>Go to firestore access page</button></a>
