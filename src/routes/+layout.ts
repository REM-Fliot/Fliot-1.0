
// import { redirect } from '@sveltejs/kit';
// import { page } from '$app/stores';  
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '$lib/firebase/firebase';
// import type { User } from 'firebase/auth';

// export const load = async (LayoutLoadEvent) => {
        
//     // console.log(LayoutLoadEvent)
//     const authenticated_route = LayoutLoadEvent.route.id?.startsWith("/(authenticated)")
//     const authUser: User | boolean = await getAuthUser();
//     function getAuthUser() {
//         return new Promise(resolve => {
//             onAuthStateChanged(
//                 auth,
//                 user => resolve(user ? user : false)
//             );
//         });
//     }
//     if (authenticated_route) {
//         if (authUser) {
//             return {props: {authUser}}
//         }
//         else {
//             console.log("Hello")
//             throw redirect(302,"/login")
//         }
//     }
//     else {
//         if (authUser) {
//             throw redirect(302,"/dashboard")
//         }
//     }
    
//     // session.user ? {status: 200} : {redirect: '/login', status: 302}
        
   
// //     return {};
// };
