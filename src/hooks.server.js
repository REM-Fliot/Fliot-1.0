// import { auth } from '$lib/firebase/firebase';
// import { authUser } from './store/authstore';


// /** @type {import('@sveltejs/kit').Handle} */
// export async function handle({ event, resolve }) {
//     let user = auth.currentUser
//     console.log(user)
//     if (user) {
//         authUser.set({
//             uid: user.uid,
//             email: user.email || ''
//           });
//     }
//     else {
//         authUser.set(undefined);
//     }
    

//     const response = await resolve(event);
//     return response;
// }
