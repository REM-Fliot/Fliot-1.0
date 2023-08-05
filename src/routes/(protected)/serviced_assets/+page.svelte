<script lang = "ts">
	import { onMount } from 'svelte';
	import SearchFeature from '../../../components/Search_feature.svelte';
	import Spinner from '../../../components/Spinner.svelte';
	import { invalidateAll } from '$app/navigation';
	export let data
	$: assets = data.assets
	$: loaded = data.loaded
	onMount(async () => {
		
		if (!loaded) {
            await invalidateAll()
        }
	})
</script>

{#if !loaded}
	<Spinner/>
	
{:else}
	<SearchFeature assets = {assets} />
{/if}
