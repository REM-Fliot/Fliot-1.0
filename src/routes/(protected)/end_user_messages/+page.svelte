<!-- <script>
	import CurrentChats from "../../../components/Current_Chats.svelte";
	import NewChat from "../../../components/New_Chat.svelte";
	import Spinner from "../../../components/Spinner.svelte";

	export let data;
	$: loaded = data.loaded
	$: chats = data.chats


</script>
<NewChat specifyEmail= {false}/>

{#if !loaded}
	<Spinner/>
	
{:else}
	<CurrentChats chats = {chats}/>
{/if}
 -->
