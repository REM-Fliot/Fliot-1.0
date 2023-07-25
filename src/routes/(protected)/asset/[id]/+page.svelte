<script>
	import { dataset_dev } from 'svelte/internal';
	import AssetPage from '../../../components/Asset_Page.svelte';
	export let data
	let red = data.red
</script>

<AssetPage {data} />

