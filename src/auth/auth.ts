import { goto } from '$app/navigation';
import {
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut
} from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { client_auth, db } from '../lib/firebase/firebase';
import { current_company, loaded, technician_company, user_type } from '../store/authStores';
import { UserType } from '../types';

export const clientAuthHandlers = {
	addCompany: async (email: string, pass: string, company_name: string) => {
		await createUserWithEmailAndPassword(client_auth, email, pass).then(
			async (user_credentials) => {
				current_company.set(company_name); //Dont think this should be set here
				user_type.set(UserType.TECHNICIAN);
				technician_company.set(null);
				const email = user_credentials.user.email;
				await addDoc(collection(db, 'companies', company_name, 'assets'), {
					ASSET_NAME: '_PLACEHOLDER_',
					CLIENT_NAME: '_PLACEHOLDER_',
					DATE: '_PLACEHOLDER_',
					COMPANY: '_PLACEHOLDER_'
				});
				await setDoc(doc(db, 'companies', company_name!, 'end-users', 'first account'), {
					EMAIL: email,
					USERNAME: 'ROOT',
					IS_ADMIN: true
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
					USER_TYPE: UserType.TECHNICIAN,
					TECHNICIAN_COMPANY: null
				});
				await goto('/dashboard');
			}
		);
	},
	login: async (email: string, pass: string) => {
		await signInWithEmailAndPassword(client_auth, email, pass).then(async (user_credentials) => {
			loaded.set(false);
		});
	},
	logout: async () => {
		await signOut(client_auth).then(async () => {
			loaded.set(false);
		});
	},
	resetPassword: async (email: string) => {
		await sendPasswordResetEmail(client_auth, email);
	}
};
