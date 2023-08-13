<!-- <script>
	import { invalidateAll } from "$app/navigation";
	import { onMount } from "svelte";
	import CurrentChat from "../../../../components/Current_Chat.svelte";
	import NewChat from "../../../../components/New_Chat.svelte";
	import Spinner from "../../../../components/Spinner.svelte";

	export let data;
	$: loaded = data.loaded
    $: messages = data.messages
    $: chat_id = data.chat_id
    onMount(async () => {
		
		if (!loaded) {
            await invalidateAll()
        }
	})

</script>
<NewChat specifyEmail= {false}/>

{#if !loaded}
	<Spinner/>
{:else}
	<CurrentChat messages = {messages} chat_id = {chat_id}/>
{/if}
 -->
