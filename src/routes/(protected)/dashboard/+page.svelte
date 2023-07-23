<script lang = "ts">
	import { goto } from "$app/navigation";
	import { auth } from "$lib/firebase/firebase";
	import { clientAuthHandlers } from "../../../auth/auth";
	import SearchFeature from "../../../components/Search_feature.svelte";
	import { auth_user } from "../../../store/authUser";

</script>

<SearchFeature/>

<a data-sveltekit-preload-data="hover" href="/firestore"><button>Go to firestore access page</button></a>
<a data-sveltekit-preload-data="hover" href="/add-technician"><button>Add a new technician</button></a>
