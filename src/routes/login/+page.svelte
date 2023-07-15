<script>
	import { goto } from "$app/navigation";
    import Authenticate from "../../components/Authenticate.svelte";
</script>

<Authenticate/>
<button on:click={async ()=>{await goto("dashboard")}}>Go to dashboard unauthenticated</button>
