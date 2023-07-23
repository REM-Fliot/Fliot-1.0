<script lang="ts">
	import { doc, setDoc } from 'firebase/firestore/lite';
	import { auth_user } from '../../../store/authUser';
	import { db } from '$lib/firebase/firebase';

	let email = '';
	let password = '';
	let missing_fields = false;
	let error = false;
	let err_info = false;
	let authenticating = false;

	async function handleAuthenticate(event) {
		event.preventDefault();
		if (authenticating) return;
		if (!email || (!password)) {
			missing_fields = true;
			return;
		}
		authenticating = true;
		// //Have the required information
		const response = await fetch('api/add-technician', {
			method: 'POST',
			body: JSON.stringify({ email: email, pass: password, uid: $auth_user?.user.uid }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (!response.ok) {
			console.log(response.status, response.statusText);
			error = true;
			authenticating = false;
		}
		const {uid} = await response.json()
		const company_name = $auth_user!.company //MIGHT BE BAD (null assertion)
		console.log(company_name,uid)
		await setDoc(doc(db, "companies", company_name, "employees", uid), {
			email: email,
		});
		await setDoc(doc(db, "users", uid), {
			email: email,
			company: company_name
		});
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
			<input bind:value={email} type="email" placeholder="Email" />
		</label>
		<label>
			<input bind:value={password} type="password" placeholder="Password" />
		</label>

		{#if authenticating}
			<button id="submit-disabled" type="button"> Connecting... </button>
		{:else}
			<button id="submit" type="submit"> Submit </button>
		{/if}
	</form>
</div>

<style>
	@font-face {
		src: url(fonts/Lato/Lato-Regular.ttf);
		font-family: lato;
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
