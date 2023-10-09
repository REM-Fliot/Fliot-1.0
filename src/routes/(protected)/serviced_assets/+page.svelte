<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';
	import SearchFeature from '../../../components/Search_feature.svelte';
	import Spinner from '../../../components/Spinner.svelte';
	export let data;
	$: assets = data.assets;
	$: local_loaded = data.loaded;
	onMount(async () => {
		if (!local_loaded) {
			await invalidateAll();
		}
	});
</script>

{#if !local_loaded}
	<Spinner />
{:else}
	<SearchFeature {assets} />
{/if}
