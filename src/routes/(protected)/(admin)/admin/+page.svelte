<script lang="ts">
	import { client_auth } from '$lib/firebase/firebase';

	const card = 'p-10 m-10 hover:shadow-lg rounded-3xl text-center text-xl w-1/5';
</script>

<h1 class="text-xl my-4">Logged in as: {client_auth.currentUser?.displayName}</h1>
<div class="flex flex-row">
	<a class={card} href="/manage-employees">
		<img width="150" class="inline" alt="Manage employees" src="/svgs/admin/employees.svg" />
		<p>Manage employees</p>
	</a>
	<a class={card} href="/#">
		<img width="150" class="inline" alt="Manage clients" src="/svgs/admin/companies.svg" />
		<p>Manage clients</p>
	</a>
</div>
