<script lang = "ts">
    import { onMount } from 'svelte'
    import { auth } from '../lib/firebase/firebase'
	import { onAuthStateChanged, updatePhoneNumber } from 'firebase/auth';
	import { goto } from '$app/navigation';
    import { page } from '$app/stores';  
    import { get } from 'svelte/store';
	import Spinner from '../components/Spinner.svelte';
	import { logEvent } from 'firebase/analytics';
	import { redirect } from '@sveltejs/kit';
    import { is_loading } from '../store/authstore';

    
    // let isLoading = true;
    let render = undefined;
    let authenticated_route = $page.route.id?.startsWith("/(authenticated)")
    



    // export let data
    // console.log(data)



    // // let authenticated_route = false;
    // user.subscribe(val =>{
    //     render = val
    //     if (authenticated_route)
    //     console.log(render)
    // })
    
    // // let user = auth.currentUser
    // //On mount = on page load

    // is_loading.subscribe(()=>{
    //     render = !is_loading
    // })
    // console.log(render)
    onMount(() => {
        console.log($is_loading)
        // isLoading = true;

        // const getCurrentUser = async () => {
        //     const currentUser = await auth.currentUser
        //     //Access
        //     console.log(currentUser)
        // }
        // getCurrentUser()


        onAuthStateChanged(auth, async (user) => {
            console.log(user)
            if (authenticated_route) {
                if (!user) {
                    await goto("/login")
                }
            }
            else {
                if (user) {
                    await goto("/dashboard")
                }
            }
            is_loading.set(false)

            // isLoading = false
            
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
<!-- {console.log("---------------")}
{console.log(render)}
{console.log((render === null) && $page.route.id.includes("dashboard"))}
{console.log("---------------")} -->
{console.log($page.route.id)}
<div>

    <!-- {#if render === undefined || (render === null && authenticated_route) || (render !== null && authenticated_route)} -->
    {#if $is_loading || true}
        <Spinner/>
        <!-- {browser ? goto("/login") : false}  -->
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
