<script lang="ts">
	import { current_company, is_admin } from '../../../store/authStores';

	// const handlePing1 = async () => {
	// 	const employee_ref = doc(
	// 		db,
	// 		'companies',
	// 		$current_company!,
	// 		'employees',
	// 		client_auth.currentUser!.uid
	// 	);
	// 	await updateDoc(employee_ref, {
	// 		IS_ADMIN: true
	// 	});
	// };
	// const handlePing2 = async () => {
	// 	const employee_ref = doc(
	// 		db,
	// 		'companies',
	// 		$current_company!,
	// 		'employees',
	// 		client_auth.currentUser!.uid
	// 	);
	// 	await updateDoc(employee_ref, {
	// 		IS_ADMIN: false
	// 	});
	// };
	// const handlePing3 = async () => {
	// 	const employee_ref = doc(
	// 		db,
	// 		'companies',
	// 		$current_company!,
	// 		'employees',
	// 		client_auth.currentUser!.uid
	// 	);
	// 	await getDoc(employee_ref).then((doc) => {
	// 		console.log(doc.data()!.IS_ADMIN);
	// 	});
	// };
</script>

<div>
	{#if $current_company}
		<h1>{$current_company}'s Dashboard</h1>
	{/if}
</div>

<a data-sveltekit-preload-data="hover" href="/firestore">
	<button>Go to firestore access page</button>
</a>
<a data-sveltekit-preload-data="hover" href="/serviced_assets">
	<button>Search serviced assets</button>
</a>
{#if $is_admin}
	<a data-sveltekit-preload-data="hover" href="/manage-employees">
		<button>Manage Employees</button>
	</a>
	<a data-sveltekit-preload-data="hover" href="/add-technician">
		<button>Add a new technician</button>
	</a>
	<a data-sveltekit-preload-data="hover" href="/add-end-user-company">
		<button>Add a new end-user company</button>
	</a>
{/if}
<a data-sveltekit-preload-data="hover" href="/add-fsr-template">
	<button>Add FSR Template</button>
</a>
<a data-sveltekit-preload-data="hover" href="/test-field"><button>Test Field</button></a>
<!-- <button on:click={handlePing1}>set to Fliot</button>
<button on:click={handlePing2}>set to Technician</button>
<button on:click={handlePing3}>check if is admin</button> -->
