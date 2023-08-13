<script lang="ts">
	import { onMount } from 'svelte';
	import { client_auth, db } from '../lib/firebase/firebase';
	import { onAuthStateChanged } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Spinner from '../components/Spinner.svelte';
  import { auth_user, creating_company} from '../store/authUser';
	import { collection, doc, getDoc } from 'firebase/firestore/lite';
	import { browser } from '$app/environment';
	import { error } from '@sveltejs/kit';

    
    //All routes under the (protected) folder
    let protected_route = $page.route.id?.startsWith("/(protected)")

    onMount(async ()=>{
        if (protected_route && $auth_user !== undefined) {
            if (!$auth_user) {
                //Not logged in but trying to access protected routes
                await goto("/login")
            }
        }
        else {
            if ($auth_user) {
                //Logged in but trying to access the login page
                await goto("/dashboard")
            }
        }
    })
    
    //onMount = immediately when the page renders
</script>

<div>
    {#if $auth_user === undefined}
        <Spinner/>
    {:else}
        <slot/>
    {/if}
</div>
