import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { client_auth } from '$lib/firebase/firebase';
import { DocumentSnapshot, onSnapshot, type DocumentData } from 'firebase/firestore';
import { get } from 'svelte/store';
import { is_admin } from '../store/authStores';
import { getProperDoc } from '../utility/get-proper-doc';

export const adminListener = async () => {
	console.log('entered adminListener');
	console.log(client_auth.currentUser?.uid);
	const doc_ref = getProperDoc(client_auth.currentUser!.uid);
	console.log('after doc_ref');
	return onSnapshot(doc_ref, setAdminFromListener);
};

export const setAdminFromListener = async (doc: DocumentSnapshot<DocumentData>) => {
	console.log('Employee admin status changed in DB!');
	if (!doc.exists() || doc.data() === undefined || doc.data() === null) {
		console.log('ERROR');
		throw new Error('Document does not have IS_ADMIN property');
	}
	const is_administrator = doc.data().IS_ADMIN;
	const admin_route = get(page).route.id?.startsWith('/(protected)/(admin)');
	if (admin_route && !is_administrator) {
		//Not admin but trying to access admin route
		console.log('Redirected to dashboard (not admin) (from client)');
		await goto('/dashboard');
	}
	is_admin.set(is_administrator);
};
