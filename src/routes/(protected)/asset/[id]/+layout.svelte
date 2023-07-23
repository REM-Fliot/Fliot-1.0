<script>
	import { page } from '$app/stores';
	import { Asset_list, Asset } from '../../../store/asset';

	export let data
	let red = data.red
	
	const id = $page.params.id;

	const current_asset = Asset_list.find((asset) => asset.id === id);
</script>

{#if current_asset}
	<slot />
{:else}
	<div>Error Asset not found</div>
{/if}
