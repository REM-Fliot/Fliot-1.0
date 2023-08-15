<script lang="ts">
	import { error } from '@sveltejs/kit';
	import { current_company } from '../../../store/authStores';
	import { fliotGET } from '../../../utility/api-utility';
	import { page } from '$app/stores';

	const handlePing = async () => {
		const response = await fliotGET('private/test');
	};
</script>

<div>
	{#if $current_company}
		<h1>{$current_company}'s Dashboard</h1>
	{/if}
</div>

<a data-sveltekit-preload-data="hover" href="/firestore"
	><button>Go to firestore access page</button></a>
<a data-sveltekit-preload-data="hover" href="/add-technician"
	><button>Add a new technician</button></a>
<a data-sveltekit-preload-data="hover" href="/serviced_assets"
	><button>Search serviced assets</button></a>
<a data-sveltekit-preload-data="hover" href="/manage-employees"
	><button>Manage Employees</button></a>
<a data-sveltekit-preload-data="hover" href="/add-fsr-template"
	><button>Add FSR Template</button></a>
<a data-sveltekit-preload-data="hover" href="/test-field"><button>Test Field</button></a>
