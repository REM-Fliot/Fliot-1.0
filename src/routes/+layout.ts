
// import { redirect } from '@sveltejs/kit';
// import { page } from '$app/stores';  
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '$lib/firebase/firebase';

// export const load = async (PageLoadEvent: any) => {
        
//         onAuthStateChanged(auth, (user) => {
//             if (PageLoadEvent.route.id.startsWith("/(authenticated)")) {
//                 if (!user) {
//                     throw redirect(302, '/login');
//                 }
//             }
//         });
   
//     return {};
//   };
