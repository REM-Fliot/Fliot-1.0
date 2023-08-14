import { db } from '$lib/firebase/firebase';
import { get } from 'svelte/store';
import {
	QueryDocumentSnapshot,
	collection,
	getDocs,
	type DocumentData,
	query,
	orderBy,
	limit
} from 'firebase/firestore';

const fliotData = async (company: string, query: string) => {
	let assets: Array<QueryDocumentSnapshot<DocumentData>> = [];

	const col_ref = collection(db, 'companies', company, query);
	await getDocs(col_ref).then((snapshot) => {
		snapshot.docs.forEach((doc) => {
			assets.push(doc);
		});
	});
	return assets;
};

export const fetchAssets = async (company: string) => {
	return fliotData(company, 'assets');
};
export const fetchEmployees = async (company: string) => {
	return fliotData(company, 'employees');
};
// export const fetchChats = async (company: string) => {
// 	let chats: Array<QueryDocumentSnapshot<DocumentData>> = [];

// 	const col_ref = collection(db, 'companies', company, 'chats');
// 	await getDocs(col_ref).then((snapshot) => {
// 		snapshot.docs.forEach((doc) => {
// 			chats.push(doc);
// 		});
// 	});
// 	return chats;
// };
export const fetchMessages = async (company: string, chat_id: string) => {
	let messages: Array<QueryDocumentSnapshot<DocumentData>> = [];

	const col_ref = collection(db, 'companies', company, 'assets', chat_id, 'chat');
	const q = query(col_ref, orderBy('TIME_CREATED'), limit(25));
	await getDocs(q).then((snapshot) => {
		snapshot.docs.forEach((doc) => {
			messages.push(doc);
		});
	});
	return messages;
};

// export const getCompany()
