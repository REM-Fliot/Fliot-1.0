import { goto } from '$app/navigation';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { client_auth, db } from '../lib/firebase/firebase';
import { UserType } from '../types';

export const clientAuthHandlers = {
	addCompany: async (email: string, pass: string, company_name: string) => {
		await createUserWithEmailAndPassword(client_auth, email, pass)
			.then(async (user_credentials) => {
				// current_company.set(company_name); //Dont think this should be set here
				const email = user_credentials.user.email;
				await addDoc(collection(db, 'companies', company_name, 'assets'), {
					ASSET_NAME: '_PLACEHOLDER_',
					CLIENT_NAME: '_PLACEHOLDER_',
					DATE: '_PLACEHOLDER_'
				});

				//User organization details (IE is an administrator, etc)
				await setDoc(doc(db, 'companies', company_name, 'employees', user_credentials.user.uid), {
					EMAIL: user_credentials.user.email,
					USERNAME: 'ADMIN',
					IS_ADMIN: true
				});

				//User settings (IE preferences, user details, etc)
				await setDoc(doc(db, 'users', user_credentials.user.uid), {
					EMAIL: email,
					COMPANY: company_name,
					USER_TYPE: UserType.TECHNICIAN
				});
				await goto('/dashboard');
			})
			.catch((err) => {
				console.log(err);
				throw err;
			});
	},
	login: async (email: string, pass: string) => {
		await signInWithEmailAndPassword(client_auth, email, pass)
			.then(async (user_credentials) => {
				let company;
				const user = user_credentials.user;
				const col_ref = doc(db, 'users', user.uid);
				await getDoc(col_ref)
					.then((snapshot) => {
						company = snapshot.data()?.company;
					})
					.catch(() => {
						console.log('No user exists with that id');
					});
				// if (company) {
				// 	current_company.set(company);
				// }
				// console.log('redirected from button');
				// await goto('/dashboard');
			})
			.catch((err) => {
				console.log(err);
				throw err;
			});
	},
	logout: async () => {
		await signOut(client_auth)
			.then(async () => {
				// current_company.set(null);
				// is_admin.set(null);
				// console.log('redirected from button');
				// await goto('/login');
			})
			.catch((err) => {
				console.log(err);
			});
	}
};
