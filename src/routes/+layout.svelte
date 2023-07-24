<script lang="ts">
	import { onMount } from 'svelte';
	import { auth, db } from '../lib/firebase/firebase';
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
    //onMount = immediately when the page renders
    // onMount(() => {
            onAuthStateChanged(auth, async (user) => {
                if (!$creating_company && browser) {
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
                    
                    if (user) {
                        // console.log("hello")
                        let company
                        const col_ref = doc(db, "users", user.uid)
                        await getDoc(col_ref).then(snapshot=>{
                            if (snapshot.exists()) {
                                company = snapshot.data()?.COMPANY
                                console.log(company,"here")
                                
                                if (company) {
                                    auth_user.set({user: user, company: company})
                                }
                                else {
                                    throw error(400,"No company exists for this user")
                                }
                            }
                            else {
                                throw error(400,"No user exists with that id")
                            }
                        })
                        
                        
                    }
                    else {
                        auth_user.set(null)
                    }
                }
                
            
            });
        
    // })
</script>

<div>
    {#if $auth_user === undefined}
        <Spinner/>
    {:else}
        <slot/>
    {/if}
</div>
