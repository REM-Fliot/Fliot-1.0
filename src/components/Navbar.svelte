<script>
	import { goto } from '$app/navigation';
	import { clientAuthHandlers } from '../auth/auth';

	const gotoDash = async () => {
		await goto('/dashboard');
	};
</script>

<div class="w-1/6 h-screen bg-black rounded-r-3xl flex flex-col gap-y-10">
	<h1 class="text-center text-7xl p-4 flex justify-center font-logo">
		<span class="text-white">Fl</span>
		<span class="text-blue">iot</span>
	</h1>
	<div class="flex flex-col gap-y-4">
		<button class="p-2 w-3/4 m-auto text-black bg-blue text-2xl rounded-2xl" on:click={gotoDash}>
			<div class="flex">
				<img alt="An arrow to login" src="/svgs/navbar/search.svg" />
				<p class="my-auto">&nbsp; Assets</p>
			</div>
		</button>
		<button class="p-2 w-3/4 m-auto text-white text-2xl" on:click={gotoDash}>
			<div class="flex">
				<img class="inline" alt="An arrow to login" src="/svgs/navbar/plus_circle.svg" />
				<p class="my-auto">&nbsp; Assign New</p>
			</div>
		</button>
		<button class="p-2 w-3/4 m-auto text-white text-2xl" on:click={gotoDash}>
			<div class="flex">
				<img class="inline" alt="An arrow to login" src="/svgs/navbar/inquires.svg" />
				<p class="my-auto">&nbsp; Inquires</p>
			</div>
		</button>
		<button class="p-2 w-3/4 m-auto text-white text-2xl" on:click={gotoDash}>
			<div class="flex">Go back to dashboard</div>
		</button>
	</div>
	<div class="flex flex-col">
		<button class="p-2 w-3/4 m-auto text-white text-2xl" on:click={clientAuthHandlers.logout}>
			<div class="flex">
				<img class="inline" alt="An arrow to login" src="/svgs/navbar/logout.svg" />
				<p class="my-auto">&nbsp; Sign Out</p>
			</div>
		</button>
		<button class="logout" on:click={() => {}}>Help</button>
	</div>
</div>
