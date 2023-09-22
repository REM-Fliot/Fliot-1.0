import { db } from '$lib/firebase/firebase';
import {
	QueryDocumentSnapshot,
	collection,
	getDocs,
	limit,
	orderBy,
	query,
	type DocumentData
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
	return await fliotData(company, 'assets');
};

export const fetchEndUsers = async (company: string) => {
	return await fliotData(company, 'end-users');
};

export const fetchFsrTemplates = async (company: string) => {
	return await fliotData(company, 'fsr_templates');
};

export const fetchEmployees = async (
	company: string,
	is_technician_company: boolean,
	technician_company: string | null = null
) => {
	let employees: Array<QueryDocumentSnapshot<DocumentData>> = [];
	let col_ref = undefined;
	if (is_technician_company) {
		col_ref = collection(db, 'companies', company, 'employees');
	} else {
		col_ref = collection(db, 'companies', technician_company!, 'end-users', company!, 'employees');
	}

	await getDocs(col_ref).then((snapshot) => {
		snapshot.docs.forEach(async (doc) => {
			employees.push(doc);
		});
	});
	return employees;
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
