<script lang="ts">
	import { db } from '$lib/firebase/firebase';
	import { doc, setDoc } from 'firebase/firestore';
	import { current_company, technician_company, user_type } from '../../../../store/authStores';
	import { fliotPOST } from '../../../../utility/api-utility';
	import { getProperDoc } from '../../../../utility/get-proper-doc';

	let email = '';
	let username = '';
	let password = '';
	let missing_fields = false;
	let error = false;
	let err_info = '';
	let authenticating = false;
	let success = false;

	async function handleAuthenticate(event: any) {
		event.preventDefault();
		if (authenticating) return;
		if (!email || !password) {
			missing_fields = true;
			return;
		}
		authenticating = true;
		//Have the required information
		const body = {
			email: email,
			pass: password,
			username: username
		};
		console.log(body);
		const response = await fliotPOST('private/admin/add-user', body);
		const uid = await response.text();
		const user_doc = getProperDoc(uid);
		console.log($user_type);
		await setDoc(user_doc, {
			EMAIL: email,
			USERNAME: username,
			IS_ADMIN: false
		});
		await setDoc(doc(db, 'users', uid), {
			EMAIL: email,
			COMPANY: $current_company,
			USER_TYPE: $user_type,
			TECHNICIAN_COMPANY: $technician_company
		});
		authenticating = false;
		error = false;
		email = '';
		username = '';
		password = '';
		success = true;
	}
</script>

<div class="authContainer">
	<form on:submit={handleAuthenticate}>
		<h2 id="login-title">Add New Technician</h2>
		{#if missing_fields}
			<p class="error">Missing Fields</p>
		{:else if error}
			<p class="error">{err_info}</p>
		{/if}
		<label>
			<input bind:value={username} type="text" placeholder="Name" />
		</label>
		<label>
			<input bind:value={email} type="email" placeholder="Email" />
		</label>
		<label>
			<input bind:value={password} type="password" placeholder="Password" />
		</label>

		{#if authenticating}
			<button id="submit-disabled" type="button">Connecting...</button>
		{:else}
			<button id="submit" type="submit">Submit</button>
		{/if}
		{#if success}
			<span id="success">User successfully added!</span>
		{/if}
	</form>
</div>

<style>
	@font-face {
		src: url(fonts/Lato/Lato-Regular.ttf);
		font-family: lato;
	}
	#success {
		color: green;
	}
	.authContainer {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1;
		padding: 1rem;
	}
	form {
		display: flex;
		flex-direction: column;
		row-gap: 1rem;
		max-width: 100%;
		width: 40rem;
	}
	form input {
		width: 100%;
		font-size: 1.5rem;
		border-color: #1e272e;
		border-radius: 0.5rem;
		border-width: 0.125rem;
		border-style: solid;
	}
	* {
		font-family: lato;
		font-size: 1rem;
	}
	#login-title {
		font-size: 3rem;
		text-align: center;
		margin: 0;
	}
	#submit {
		width: 100%;
		font-size: 1.5rem;
		border-color: #1e272e;
		border-radius: 0.5rem;
		border-width: 0.125rem;
		border-style: solid;
		transition-duration: 0.25s;
		padding: 0.2rem;
		cursor: pointer;
	}
	#submit:hover {
		background-color: #34ace0;
	}

	#submit-disabled {
		width: 100%;
		font-size: 1.5rem;
		border-color: #1e272e;
		border-radius: 0.5rem;
		border-width: 0.125rem;
		border-style: solid;
		transition-duration: 0.25s;
		padding: 0.2rem;
		cursor: pointer;
	}
	.error {
		color: #e03456;
		text-align: center;
	}
</style>
