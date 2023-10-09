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
	let employee_being_modified: QueryDocumentSnapshot<DocumentData>;

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
		employee_being_modified = employee;
		username_update = data.USERNAME;
		global_modifying = true;
	};
	const handleUpdate = async (employee: QueryDocumentSnapshot<DocumentData>) => {
		const employee_ref = getProperDoc(employee.id);
		await updateDoc(employee_ref, {
			USERNAME: username_update
		});
		await invalidateAll();
		employee.is_modifying = false;
		global_modifying = false;
	};
	const handleToggleAdmin = async (uid: string, is_admin: boolean) => {
		const employee_ref = await getProperDoc(uid);

		await updateDoc(employee_ref, {
			IS_ADMIN: is_admin
		});
		await invalidateAll();
	};
</script>

<div class="my-10 flex flex-row">
	<div class="w-1/2">
		<h1 class="text-3xl">{company}'s technicians</h1>
		{#if !local_loaded}
			<Spinner />
		{:else}
			<div class="flex flex-col my-6">
				{#each employees as employee}
					<div class="p-4 flex flex-row">
						<img alt="A default technician" src="/svgs/admin/manage-users/technician.svg" />
						<div class="flex flex-col p-2 w-1/2 gap-1">
							{#if employee.is_modifying}
								<form
									on:submit={() => {
										handleUpdate(employee);
									}}
								>
									<label>
										<b>Name:&nbsp;</b>
										<input type="text" placeholder="Name" bind:value={username_update} />
									</label>
									<button>Update</button>
								</form>
							{:else}
								<div>
									<b>Name:&nbsp;</b>
									{employee.data().USERNAME}
								</div>
							{/if}
							<div>
								<b>Email:&nbsp;</b>
								{employee.data().EMAIL}
							</div>
							<!-- {#if employee.data().IS_ADMIN} -->
							<p class={employee.data().IS_ADMIN ? '' : ' invisible'}>ADMIN</p>
							<!-- {/if} -->
						</div>
						<div class="flex flex-row ml-auto p-2">
							{#if employee.data().EMAIL != client_auth.currentUser?.email}
								<!-- <button
									class="px-2 hover:bg-red rounded-l-lg border-l-2 border-t-2 border-b-2 border-black"
									on:click={() => handleDelete(employee.id)}
								>
									<img
										width="35"
										alt="A default technician"
										src="/svgs/admin/manage-users/remove_technician.svg"
									/>
								</button> -->

								<!-- <button on:click={() => handleToggleAdmin(employee.id, !employee.data().IS_ADMIN)}>
									{employee.data().IS_ADMIN ? 'Remove Admin' : 'Add Admin'}
								</button> -->

								<button
									class={'p-2 m-3 hover:bg-off_black border-black border-2 rounded-full'}
									on:click={() => handleModify(employee)}
								>
									<img alt="edit technician" src="/svgs/admin/manage-users/edit.svg " width="35" />
								</button>
							{/if}
						</div>
					</div>
				{/each}
			</div>
			<button
				class={'p-2 w-2/5 text-2xl rounded-2xl hover:bg-blue cursor-pointer border-2 border-black' +
					(global_modifying ? ' shadow-inner' : '')}
			>
				<div class="flex">
					<img alt="An arrow to login" src="svgs/admin/manage-users/add_technician.svg" />
					<p class="my-auto">&nbsp; Add Technician</p>
				</div>
			</button>
		{/if}
	</div>
	{#if global_modifying}
		<div class="w-1/2 border-2 border-black rounded-lg p-4">
			<h2 class="text-center text-3xl">Modify Technician:</h2>
			<div class="">
				<form
					class="flex flex-col gap-4"
					on:submit={() => {
						handleUpdate(employee_being_modified);
					}}
				>
					<label>
						<h3>Name:</h3>
						<input bind:value={username_update} type="text" placeholder="Name" />
					</label>
					<label>
						<h3>Admin status:</h3>
						<input bind:value={username_update} type="radio" placeholder="Name" />
						<input bind:value={username_update} type="radio" placeholder="Name" />
					</label>
					<label>
						<h3>Delete user:</h3>
						<input bind:value={username_update} type="checkbox" placeholder="Name" />
					</label>
					<div class="flex flex-row gap-2">
						<button class="p-4 rounded-lg border-2 w-3/4 bg-blue">Confirm Changes</button>
						<button class="p-4 rounded-lg border-2 w-1/4 bg-red">Delete User</button>
					</div>
				</form>
			</div>
		</div>
	{/if}
</div>
