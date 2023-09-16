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
	import { current_company } from '../../../../store/authStores';
	import { fliotDELETE } from '../../../../utility/api-utility';
	import { getProperDoc } from '../../../../utility/get-proper-doc';

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
		const employee_ref = await getProperDoc(uid);
		await deleteDoc(employee_ref);
		await deleteDoc(doc(db, 'users', uid));
		await invalidateAll();
		await fliotDELETE('private/admin/delete-user', { uid: uid });
	};
	const handleModify = async (employee: QueryDocumentSnapshot<DocumentData>) => {
		const data = employee.data();
		username_update = data.USERNAME;
		employee.is_modifying = true;
		global_modifying = true;
	};
	const handleUpdate = async (employee: QueryDocumentSnapshot<DocumentData>) => {
		const employee_ref = await getProperDoc(employee.id);
		await updateDoc(employee_ref, {
			USERNAME: username_update
		});
		await invalidateAll();
		employee.is_modifying = false;
		global_modifying = false;
	};
	const handleToggleAdmin = async (uid: string, is_admin: boolean) => {
		console.log('clicked!');
		const employee_ref = await getProperDoc(uid);

		await updateDoc(employee_ref, {
			IS_ADMIN: is_admin
		});
		await invalidateAll();
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
					}}
				>
					<label>
						Name: <input type="text" placeholder="Name" bind:value={username_update} />
					</label>
					<button>Update</button>
				</form>
			{:else}
				<div>Name: {employee.data().USERNAME}</div>
			{/if}
			<div>Email: {employee.data().EMAIL}</div>
			{#if employee.data().EMAIL != client_auth.currentUser?.email}
				<button on:click={() => handleDelete(employee.id)}>Delete</button>

				<button on:click={() => handleToggleAdmin(employee.id, !employee.data().IS_ADMIN)}>
					{employee.data().IS_ADMIN ? 'Remove Admin' : 'Add Admin'}
				</button>

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
