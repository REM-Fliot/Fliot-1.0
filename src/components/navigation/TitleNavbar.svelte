<script>
	import { page } from '$app/stores';
</script>

<div class="flex flex-row justify-between">
	<h1 class="text-7xl"><slot /></h1>
	{#if !$page.route.id?.endsWith('my-account')}
		<a
			href="/my-account"
			class="flex whitespace-nowrap border-2 border-transparent hover:border-off_black rounded-xl p-2"
		>
			<img alt="My account" src="/svgs/account.svg" />
			<p class="my-auto text-2xl">&nbsp; My account</p>
		</a>
	{/if}
</div>
