<script>
	import { goto } from "$app/navigation";
    import { reroute } from "../../utility/reroute";
    import Authenticate from "../../components/Authenticate.svelte";
</script>

<Authenticate/>
<button on:click={()=>{reroute("dashboard")}}>Go to dashboard unauthenticated</button>
