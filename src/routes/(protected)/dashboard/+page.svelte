<script lang = "ts">
	import { authHandlers } from "../../../auth/auth";
	import SearchFeature from "../../../components/Search_feature.svelte";
	import { auth_user } from "../../../store/authUser";
	import { reroute } from "../../../utility/reroute";

</script>

<button on:click={authHandlers.logout}>LOGOUT</button>

<SearchFeature/>

<button on:click={()=>{reroute("firestore")}}>Go to firestore access page</button>
<button></button>
