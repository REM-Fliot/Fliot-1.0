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
	// let assets:Array<QueryDocumentSnapshot<DocumentData>> = []

	// const col_ref = collection(db,"companies",company,"assets")
	// await getDocs(col_ref).then(snapshot=>{
	//     snapshot.docs.forEach((doc)=>{
	//         assets.push(doc);
	//     })
	// })
	// return assets
	return fliotData(company, 'assets');
};

export const fetchFsrTemplates = async (company: string) => {
	// let templates:Array<QueryDocumentSnapshot<DocumentData>> = []

	// const col_ref = collection(db,"companies",company,"fsr_templates")
	// await getDocs(col_ref).then(snapshot=>{
	//     snapshot.docs.forEach((doc)=>{
	//         templates.push(doc);
	//     })
	// })
	// return templates
	return fliotData(company, 'fsr_templates');
};

export const fetchEmployees = async (company: string) => {
	let assets: Array<QueryDocumentSnapshot<DocumentData>> = [];

	const col_ref = collection(db, 'companies', company, 'employees');
	await getDocs(col_ref).then((snapshot) => {
		snapshot.docs.forEach(async (doc) => {
			assets.push(doc);
		});
	});
	return assets;
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
