<script lang="ts">
	import { clientAuthHandlers } from '../../auth/auth';

	let email = '';
	let password = '';
	let missing_fields = false;
	let error = false;
	let err_info = '';
	let resetting = false;
	let authenticating = false;

	async function handleAuthenticate(event: any) {
		event.preventDefault();
		if (authenticating) return;
		if (!email || (!password && !resetting)) {
			missing_fields = true;
			return;
		}
		authenticating = true;
		//Have the required information
		try {
			if (!resetting) {
				await clientAuthHandlers.login(email, password);
			} else {
				await clientAuthHandlers.resetPassword(email);
				authenticating = false;
			}
		} catch (err) {
			console.log(err);
			err_info = <string>err;
			error = true;
			authenticating = false;
			email = '';
			password = '';
		}
	}
	function toggleRegister() {
		resetting = !resetting;
	}
</script>

<div>
	<div class="mt-10 flex justify-center flex-wrap">
		<div class="flex justify-center flex-wrap w-1/4 gap-y-10">
			<div class="w-full">
				<form class="flex flex-wrap gap-3" on:submit={handleAuthenticate}>
					<h2 class="text-5xl text-center p-10 w-full">
						{resetting ? 'Forgot Password' : 'Sign In'}
					</h2>
					{#if missing_fields}
						<p class="text-center p-5 w-full block text-red">Missing Fields</p>
					{:else if error}
						<p class="error">{err_info}</p>
					{/if}
					{#if resetting}
						<p>
							Enter your user account's verified email address and we will send you a password reset
							link.
						</p>
					{/if}
					<div class="relative w-full">
						<input
							class="w-full p-4 text-white placeholder-white bg-black rounded-md"
							bind:value={email}
							type="email"
							placeholder="Email"
						/>
						{#if resetting}
							<button class=" absolute top-4 right-4" type="submit" disabled={authenticating}>
								<img alt="An arrow to login" src="/svgs/login/login_arrow.svg" />
							</button>
						{/if}
					</div>
					{#if !resetting}
						<div class="relative w-full">
							<input
								class="w-full p-4 text-white placeholder-white bg-blue rounded-md"
								bind:value={password}
								type="password"
								placeholder="Password"
							/>
							<button class=" absolute top-4 right-4" type="submit" disabled={authenticating}>
								<img alt="An arrow to login" src="/svgs/login/login_arrow.svg" />
							</button>
						</div>
					{:else}{/if}
				</form>
			</div>
			<a on:click={toggleRegister} href="#/" class="text-center">
				{!resetting ? 'Forgot Password?' : 'Go back to sign in'}
			</a>
		</div>
	</div>
</div>
