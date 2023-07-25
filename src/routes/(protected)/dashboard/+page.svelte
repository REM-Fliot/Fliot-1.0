<script lang = "ts">
	import { goto } from "$app/navigation";
	import { authHandlers } from "../../../auth/auth";
	import SearchFeature from "../../../components/Search_feature.svelte";
	import { auth_user } from "../../../store/authUser";

</script>


<div>
    Dashboard
	<div>
		<a data-sveltekit-preload-data="hover" href="/serviced_assets">Serviced Assets</a>
	</div>
</div>

<a data-sveltekit-preload-data="hover" href="/firestore"><button>Go to firestore access page</button></a>
