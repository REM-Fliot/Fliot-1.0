<script>
	import NewFsr from '../../../../../components/New_FSR.svelte';
	export let data
	$: assets = data.assets
	$: templates = data.templates
</script>

<NewFsr assets={assets} templates={templates}/>
