<script lang="ts">
	import { client_auth } from '$lib/firebase/firebase';
	import { current_company, roles } from '../../../store/authStores';
	import { Claims, UserType } from '../../../types';
	import { fliotGET, fliotPOST } from '../../../utility/api-utility';

	const handlePing1 = async () => {
		const claims = new Claims(true, UserType.Fliot);
		const body = {
			uid: client_auth.currentUser?.uid,
			claims: claims
		};
		await fliotPOST('private/admin/manage-roles', body);
		const token_result = await client_auth.currentUser!.getIdTokenResult(true);
		const r = new Claims(token_result.claims.admin, token_result.claims.user_type);

		console.log(token_result.claims);
		roles.set(r);
		console.log($roles);
	};
	const handlePing2 = async () => {
		const claims = new Claims(false, UserType.Technician);
		const body = {
			uid: client_auth.currentUser?.uid,
			claims: claims
		};
		await fliotPOST('private/admin/manage-roles', body);
		const token_result = await client_auth.currentUser!.getIdTokenResult(true);
		const r = new Claims(token_result.claims.admin, token_result.claims.user_type);
		console.log(token_result.claims);
		roles.set(r);
		console.log($roles);
	};
	const handlePing3 = async () => {
		const res = await fliotGET('private/get-claims-by-uid');
		const claims = await res.json();
		console.log(claims);
	};
</script>

<div>
	{#if $current_company}
		<h1>{$current_company}'s Dashboard</h1>
	{/if}
</div>

<a data-sveltekit-preload-data="hover" href="/firestore"
	><button>Go to firestore access page</button></a>
<a data-sveltekit-preload-data="hover" href="/serviced_assets"
	><button>Search serviced assets</button></a>
{#if $roles?.admin}
	<a data-sveltekit-preload-data="hover" href="/manage-employees"
		><button>Manage Employees</button></a>
	<a data-sveltekit-preload-data="hover" href="/add-technician"
		><button>Add a new technician</button></a>
{/if}
<a data-sveltekit-preload-data="hover" href="/add-fsr-template"
	><button>Add FSR Template</button></a>
<a data-sveltekit-preload-data="hover" href="/test-field"><button>Test Field</button></a>
<button on:click={handlePing1}>set to Fliot</button>
<button on:click={handlePing2}>set to Technician</button>
<button on:click={handlePing3}>check if is admin</button>
