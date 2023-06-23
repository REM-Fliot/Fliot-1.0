<script lang = "ts">
    import { onMount } from 'svelte'
    import { auth } from '../lib/firebase/firebase'

    const nonAuthRoutes = ['/login'] //Only the login page for now !!UPDATE LATER!!

    //On mount = on page load
    // onMount(() => {
    //     console.log("Mounting")
    //     const unsubscribe = auth.onAuthStateChanged(async (user) => {
    //         const currentPath = window.location.pathname
    //         if (user && user.email) {
    //             if (currentPath === '/login') window.location.href = '/dashboard'
    //             // authStore.set({email: user.email})
    //             // console.log(user.email)
    //         }
    //         else {
    //             if (!nonAuthRoutes.includes(currentPath)) window.location.href = '/login'
    //         }
    //         return
            
            
            
    //     })
    // })
</script>

<h1 id = "logo"><span id = "black">Fl</span><span id= "blue">iot</span></h1>
<div>
    <slot/>
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
