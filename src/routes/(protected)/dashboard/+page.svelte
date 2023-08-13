<script lang = "ts">
	import { error } from "@sveltejs/kit";
	import { auth_user } from "../../../store/authUser";
	import { fliotGET } from "../../../utility/api-utility";
	import { page } from "$app/stores";

	const handlePing = async () => {
		const response = await fliotGET('private/test')
		// const response = await fetch(`/api/test`, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     }
        // })
	}
</script>

<div>
	{#if $auth_user?.company}
    	<h1>{$auth_user.company}'s Dashboard</h1>
	{/if}
</div>

<a data-sveltekit-preload-data="hover" href="/firestore"><button>Go to firestore access page</button></a>
<a data-sveltekit-preload-data="hover" href="/add-technician"><button>Add a new technician</button></a>
<a data-sveltekit-preload-data="hover" href="/serviced_assets"><button>Search serviced assets</button></a>
<a data-sveltekit-preload-data="hover" href="/manage-employees"><button>Manage Employees</button></a>
<a data-sveltekit-preload-data="hover" href="/end_user_messages"><button>Messages (End User)</button></a>
<a data-sveltekit-preload-data="hover" href="/messages"><button>Messages (Technician)</button></a>

<button on:click= {handlePing}>Send Test Ping</button>
