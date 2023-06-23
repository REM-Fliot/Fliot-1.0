<script lang = "ts">
    import { onMount } from 'svelte'
    import { auth } from '../lib/firebase/firebase'
	import { onAuthStateChanged, updatePhoneNumber } from 'firebase/auth';
	import { goto } from '$app/navigation';
    import { page } from '$app/stores';  
    import { get } from 'svelte/store';
	import Spinner from '../components/Spinner.svelte';
    import { user } from '../store/authstore';
	import { logEvent } from 'firebase/analytics';

    let render = undefined
    let authenticated_route = $page.route.id?.startsWith("/(authenticated)")
    // // let authenticated_route = false;
    // user.subscribe(val =>{
    //     render = val
    //     if (authenticated_route)
    //     console.log(render)
    // })
    
    // // let user = auth.currentUser
    // //On mount = on page load

    console.log(render)

    onMount(() => {
        render = undefined
        onAuthStateChanged(auth, async (user) => {
            render = user
            console.log(user)
            console.log(render)
            
            if (authenticated_route) {
                if (user) {
                    
                }
                else {
                    goto("/login")
                    let authenticated_route = false
                    // console.log($page.route.id)
                }
                
            }
            else {
                if (user) {
                    goto("/dashboard")
                    let authenticated_route = true
                }
            }
            
        });
    })

    // authenticated.subscribe(value=> {
    //     render = value
    // })
        // const unsubscribe = auth.onAuthStateChanged(async (user) => {
        //     const currentPath = window.location.pathname
        //     if (user && user.email) {
        //         if (currentPath === '/login') window.location.href = '/dashboard'
        //         // authStore.set({email: user.email})
        //         // console.log(user.email)
        //     }
        //     else {
        //         if (!nonAuthRoutes.includes(currentPath)) window.location.href = '/login'
        //     }
        //     return
            
            
            
    //     })
    // })
</script>

<h1 id = "logo"><span id = "black">Fl</span><span id= "blue">iot</span></h1>
<div>
    {#if render === undefined}
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
