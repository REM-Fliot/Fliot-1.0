<script>
	import { onMount } from 'svelte';
	import CurrentChat from '../../../../components/Current_Chat.svelte';
	import Spinner from '../../../../components/Spinner.svelte';
	import { invalidateAll } from '$app/navigation';

	export let data;
	$: loaded = data.loaded;
	$: messages = data.messages;
	onMount(async () => {
		if (!loaded) {
			await invalidateAll();
		}
	});
</script>

<!-- <NewChat specifyEmail={false} /> -->

{#if !loaded}
	<Spinner />
{:else}
	<CurrentChat {messages} />
{/if}
