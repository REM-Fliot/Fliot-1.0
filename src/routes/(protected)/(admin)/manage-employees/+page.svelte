<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { client_auth, db } from '$lib/firebase/firebase';
	import type {
		CollectionReference,
		DocumentData,
		QueryDocumentSnapshot
	} from 'firebase/firestore';
	import { collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import Spinner from '../../../../components/Spinner.svelte';
	import { current_company, roles } from '../../../../store/authStores';
	import { Claims, UserType } from '../../../../types';
	import { fliotPOST } from '../../../../utility/api-utility';

	export let data;
	const company = $current_company!;
	$: local_loaded = data.local_loaded;
	$: employees = data.employees;
	let global_modifying: boolean;
	let col_ref: CollectionReference<DocumentData>;
	//---BINDED---
	let username_update: string;

	onMount(async () => {
		if (!local_loaded) {
			await invalidateAll();
		} else {
			col_ref = collection(db, 'companies', company, 'assets');
		}
		global_modifying = false;
	});

	const handleDelete = async (uid: string) => {
		await deleteDoc(doc(db, 'companies', company as string, 'employees', uid));
		await deleteDoc(doc(db, 'users', uid));
		await invalidateAll();
		await fliotPOST('private/admin/delete-user', JSON.stringify({ uid: uid }));
	};
	const handleModify = async (employee: QueryDocumentSnapshot<DocumentData>) => {
		const data = employee.data();
		username_update = data.USERNAME;
		employee.is_modifying = true;
		global_modifying = true;
	};
	const handleUpdate = async (employee: QueryDocumentSnapshot<DocumentData>) => {
		await updateDoc(doc(db, 'companies', company as string, 'employees', employee.id), {
			USERNAME: username_update
		});
		await invalidateAll();
		employee.is_modifying = false;
		global_modifying = false;
	};
	const handleToggleAdmin = async (uid: string, is_admin: boolean) => {
		const claims = new Claims(is_admin, UserType.Technician);
		const body = {
			uid: client_auth.currentUser?.uid,
			claims: claims
		};
		await fliotPOST('private/admin/manage-roles', body, uid);
		const token_result = await client_auth.currentUser!.getIdTokenResult(true);
		const new_claims = new Claims(token_result.claims.admin, token_result.claims.user_type);
		console.log(token_result.claims);
		roles.set(new_claims);
		console.log($roles);
	};
</script>

<h1>{company}'s employees</h1>
{#if !local_loaded}
	<Spinner />
{:else}
	{#each employees as employee}
		<div class="employee">
			{#if employee.is_modifying}
				<form
					on:submit={() => {
						handleUpdate(employee);
					}}>
					<label>Name: <input type="text" placeholder="Name" bind:value={username_update} /></label>
					<button>Update</button>
				</form>
			{:else}
				<div>Name: {employee.data().USERNAME}</div>
			{/if}
			<div>Email: {employee.data().EMAIL}</div>
			{#if employee.data().EMAIL != client_auth.currentUser?.email}
				<button on:click={() => handleDelete(employee.id)}>Delete</button>

				<button on:click={() => handleToggleAdmin(employee.id, false)}> Remove Admin </button>
				<button on:click={() => handleToggleAdmin(employee.id, true)}> Set Admin </button>

				{#if !global_modifying}
					<button on:click={() => handleModify(employee)}>Modify</button>
				{/if}
			{/if}
		</div>
	{/each}
{/if}

<style>
	.employee {
		margin: 0.5rem 0rem;
		padding: 0.25rem;
		/* border: 3px solid black; */
	}
</style>
