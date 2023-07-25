<script>
	import { goto } from '$app/navigation';
	import { clientAuthHandlers } from '../auth/auth';
</script>

<div class="container">
	<img src="src\assets\logo.png" alt="logo" class="logo" />
	<button class="logout" on:click={clientAuthHandlers.logout}>LOGOUT</button>
	<button on:click={async ()=>{await goto("dashboard")}}>Go back to dashboard</button>

	<!-- <nav>
		<ul>
			<li><a href="#" />Search Assets</li>
		</ul>
	</nav> -->
</div>

<style>
	.logo {
		width: 10%;
	}
</style>
