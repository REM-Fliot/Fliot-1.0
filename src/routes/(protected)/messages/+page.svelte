<script>
	import { onMount } from "svelte";
	import NewChat from "../../../components/New_Chat.svelte";
	import { invalidateAll } from "$app/navigation";
	import CurrentChats from "../../../components/Current_Chats.svelte";
	import Spinner from "../../../components/Spinner.svelte";
	export let data
	$: loaded = data.loaded
	$: chats = data.chats
	onMount(async () => {
		
		if (!loaded) {
            await invalidateAll()
        }
	})
</script>
<NewChat specifyEmail = {true}/>
{#if !loaded}
	<Spinner/>
	
{:else}
	<CurrentChats chats = {chats}/>
{/if}
