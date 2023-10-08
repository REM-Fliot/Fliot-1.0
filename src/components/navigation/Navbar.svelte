<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { clientAuthHandlers } from '../../auth/auth';
	import { is_admin } from '../../store/authStores';

	const gotoDash = async () => {
		await goto('/dashboard');
	};

	const selected =
		'p-2 w-3/4 m-auto text-black bg-blue text-2xl rounded-2xl hover:translate-x-3 transition-transform cursor-pointer';
	const not_selected =
		'p-2 w-3/4 m-auto text-2xl text-white rounded-2xl hover:bg-off_black hover:translate-x-3 transition-transform cursor-pointer';
	// const third =
	// 	'p-1 w-2/4 m-auto text-2xl text-white rounded-2xl hover:bg-off_black hover:translate-x-3 transition-transform cursor-pointer ';
	$: path = $page.route.id;
	$: assets = path?.endsWith('dashboard');
	let assign = false;
	let inquiries = false;
	$: admin =
		path?.endsWith('admin') ||
		path?.endsWith('manage-employees') ||
		path?.endsWith('manage-clients');
</script>

<div class="w-full h-screen bg-black flex flex-col">
	<h1 class="text-center text-8xl p-4 flex justify-center font-logo">
		<span class="text-white">Fl</span>
		<span class="text-blue">iot</span>
	</h1>
	<div class="flex flex-col gap-y-10 my-10 flex-grow justify-between">
		<div class="flex flex-col gap-y-6">
			<a class={assets ? selected : not_selected} href="/dashboard">
				<div class="flex">
					<img
						alt="An arrow to login"
						src="/svgs/navbar/search.svg"
						style={!assets
							? 'filter: invert(99%) sepia(99%) saturate(0%) hue-rotate(130deg) brightness(103%) contrast(101%);'
							: ''}
					/>
					<p class="my-auto">&nbsp; Assets</p>
				</div>
			</a>
			<a class={assign ? selected : not_selected} href="/#">
				<div class="flex">
					<img
						class="inline"
						style={!assign
							? 'filter: invert(99%) sepia(99%) saturate(0%) hue-rotate(130deg) brightness(103%) contrast(101%);'
							: ''}
						alt="An arrow to login"
						src="/svgs/navbar/plus_circle.svg"
					/>
					<p class="my-auto">&nbsp; Assign New</p>
				</div>
			</a>
			<a class={inquiries ? selected : not_selected} href="/#">
				<div class="flex">
					<img
						class="inline"
						style={!inquiries
							? 'filter: invert(99%) sepia(99%) saturate(0%) hue-rotate(130deg) brightness(103%) contrast(101%);'
							: ''}
						alt="An arrow to login"
						src="/svgs/navbar/inquires.svg"
					/>
					<p class="my-auto">&nbsp; Inquires</p>
				</div>
			</a>
			{#if $is_admin}
				<a class={admin ? selected : not_selected} href="/admin">
					<div class="flex">
						<img
							class="inline"
							style={!admin
								? 'filter: invert(99%) sepia(99%) saturate(0%) hue-rotate(130deg) brightness(103%) contrast(101%);'
								: ''}
							alt="An arrow to login"
							src="/svgs/navbar/admin.svg"
						/>
						<p class="my-auto">&nbsp; Admin</p>
					</div>
				</a>
				<!-- <a class={third} href="/admin">
					<div class="flex">
						<p class="my-auto">&middot; Admin</p>
					</div>
				</a> -->
			{/if}
		</div>
		<div class="flex flex-col gap-y-6">
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
			<a class={not_selected} href="/#">
				<div class="flex">
					<img
						class="inline"
						style="filter: invert(99%) sepia(99%) saturate(0%) hue-rotate(130deg) brightness(103%) contrast(101%);"
						alt="An arrow to login"
						src="/svgs/navbar/help.svg"
					/>
					<p class="my-auto">&nbsp; Help</p>
				</div>
			</a>
		</div>
	</div>
</div>
