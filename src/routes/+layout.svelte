<script lang = "ts">
    import { onMount } from 'svelte'
    import { auth } from '../lib/firebase/firebase'
	import { onAuthStateChanged } from 'firebase/auth';
	import { goto } from '$app/navigation';
    import { page } from '$app/stores';  
	import Spinner from '../components/Spinner.svelte';
    import { auth_user} from '../store/authUser';

    
    //All routes under the (protected) folder
    let protected_route = $page.route.id?.startsWith("/(protected)")
    
    //onMount = immediately when the page renders
    onMount(() => {
        if ($auth_user === undefined) {
            onAuthStateChanged(auth, async (user) => {
            //onAuthStateChanged = when the user variable is resolve - either it is null (not signed in), or User object.

            
            if (protected_route) {
                if (!user) {
                    //Not logged in but trying to access protected routes
                    await goto("/login")
                }
            }
            else {
                if (user) {
                    //Logged in but trying to access the login page
                    await goto("/dashboard")
                }
            }
            console.log($auth_user)
            auth_user.set(user)
            console.log($auth_user)
            });
        }
        
    })
</script>



<h1 id = "logo"><span id = "black">Fl</span><span id= "blue">iot</span></h1>
<div>
    {#if $auth_user === undefined}
        <Spinner/>
    {:else}
        <slot/>
    {/if}

</div>

<style>
    @font-face {
        src: url(fonts/Raleway/Raleway-VariableFont_wght.ttf);
        font-family: raleway;
    }
    #logo {
        font-family: raleway;
        font-size: 8rem;
        padding: 0rem;
        text-align: center;
    }
    #blue { 
        color: #34ace0;
    }

</style>
