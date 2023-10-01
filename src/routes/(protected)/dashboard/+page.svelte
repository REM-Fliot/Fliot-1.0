<script lang="ts">
	import { current_company, is_admin, user_type } from '../../../store/authStores';
	import { UserType } from '../../../types';
</script>

<div>
	{#if $current_company}
		<h1>{$current_company}'s Dashboard</h1>
	{/if}
	{#if $user_type}
		<h1>You are a {$user_type}</h1>
	{/if}
</div>

<a data-sveltekit-preload-data="hover" href="/firestore">
	<button>Go to firestore access page</button>
</a>
<a data-sveltekit-preload-data="hover" href="/serviced_assets">
	<button>Search serviced assets</button>
</a>
{#if $is_admin}
	<a data-sveltekit-preload-data="hover" href="/manage-employees">
		<button>Manage Employees</button>
	</a>
	<a data-sveltekit-preload-data="hover" href="/add-user">
		<button>Add a new {$user_type}</button>
	</a>
	{#if $user_type == UserType.TECHNICIAN}
		<a data-sveltekit-preload-data="hover" href="/add-end-user-company">
			<button>Add a new end-user company</button>
		</a>
	{/if}
{/if}
<a data-sveltekit-preload-data="hover" href="/add-fsr-template">
	<button>Add FSR Template</button>
</a>
<a data-sveltekit-preload-data="hover" href="/test-field"><button>Test Field</button></a>
<!-- <button on:click={handlePing1}>set to Fliot</button>
<button on:click={handlePing2}>set to Technician</button>
<button on:click={handlePing3}>check if is admin</button> -->
