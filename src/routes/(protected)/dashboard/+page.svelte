<script lang = "ts">
	import { authHandlers } from "../../../auth/auth";
	import SearchFeature from "../../../components/Search_feature.svelte";

</script>

<button on:click={authHandlers.logout}>LOGOUT</button>

<SearchFeature/>
