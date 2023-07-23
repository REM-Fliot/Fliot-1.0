<script>
	import { clientAuthHandlers } from '../auth/auth';
</script>

<div class="container">
	<img src="src\assets\logo.png" alt="logo" class="logo" />
	<button class="logout" on:click={clientAuthHandlers.logout}>LOGOUT</button>
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
