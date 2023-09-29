<script>
	import { goto } from '$app/navigation';
	import { clientAuthHandlers } from '../auth/auth';
</script>

<div class="w-1/6 h-screen bg-gray-800 rounded-r-3xl">
	<img src="src\assets\logo.png" alt="logo" class="logo" />
	<button class="logout" on:click={clientAuthHandlers.logout}>LOGOUT</button>
	<button
		on:click={async () => {
			await goto('/dashboard');
		}}
	>
		Go back to dashboard
	</button>
</div>

<style>
	.logo {
		width: 10%;
	}
</style>
