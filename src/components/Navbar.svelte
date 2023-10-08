<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { clientAuthHandlers } from '../auth/auth';

	const gotoDash = async () => {
		await goto('/dashboard');
	};

	const selected =
		'p-2 w-3/4 m-auto text-black bg-blue text-2xl rounded-2xl hover:translate-x-3 transition-transform';
	const not_selected =
		'p-2 w-3/4 m-auto text-2xl text-white rounded-2xl hover:bg-off_black hover:translate-x-3 transition-transform';
	const path = $page.route.id;
	const assets = path?.endsWith('dashboard');
	const assign = path === 'dashboard';
	const inquiries = path === 'dashboard';
</script>

<div class="w-1/6 h-screen bg-black flex flex-col">
	<h1 class="text-center text-8xl p-4 flex justify-center font-logo">
		<span class="text-white">Fl</span>
		<span class="text-blue">iot</span>
	</h1>
	<div class="flex flex-col gap-y-10 my-10 flex-grow justify-between">
		<div class="flex flex-col gap-y-4">
			<button class={assets ? selected : not_selected} on:click={gotoDash}>
				<div class="flex">
					<img alt="An arrow to login" src="/svgs/navbar/search.svg" />
					<p class="my-auto">&nbsp; Assets</p>
				</div>
			</button>
			<button class={assign ? selected : not_selected} on:click={gotoDash}>
				<div class="flex">
					<img
						class="inline"
						style="filter: invert(99%) sepia(99%) saturate(0%) hue-rotate(130deg) brightness(103%) contrast(101%);"
						alt="An arrow to login"
						src="/svgs/navbar/plus_circle.svg"
					/>
					<p class="my-auto">&nbsp; Assign New</p>
				</div>
			</button>
			<button class={inquiries ? selected : not_selected} on:click={gotoDash}>
				<div class="flex">
					<img
						class="inline"
						style="filter: invert(99%) sepia(99%) saturate(0%) hue-rotate(130deg) brightness(103%) contrast(101%);"
						alt="An arrow to login"
						src="/svgs/navbar/inquires.svg"
					/>
					<p class="my-auto">&nbsp; Inquires</p>
				</div>
			</button>
			<!-- <button class="p-2 w-3/4 m-auto text-white text-3xl" on:click={gotoDash}>
				<div class="flex">Go back to dashboard</div>
			</button> -->
		</div>
		<div class="flex flex-col gap-y-4">
			<button class={not_selected} on:click={clientAuthHandlers.logout}>
				<div class="flex">
					<img
						class="inline"
						style="filter: invert(99%) sepia(99%) saturate(0%) hue-rotate(130deg) brightness(103%) contrast(101%);"
						alt="An arrow to login"
						src="/svgs/navbar/logout.svg"
					/>
					<p class="my-auto">&nbsp; Sign Out</p>
				</div>
			</button>
			<button class={not_selected} on:click={() => {}}>
				<div class="flex">
					<img
						class="inline"
						style="filter: invert(99%) sepia(99%) saturate(0%) hue-rotate(130deg) brightness(103%) contrast(101%);"
						alt="An arrow to login"
						src="/svgs/navbar/help.svg"
					/>
					<p class="my-auto">&nbsp; Help</p>
				</div>
			</button>
		</div>
	</div>
</div>
