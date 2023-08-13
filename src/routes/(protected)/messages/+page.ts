// import { get } from 'svelte/store';
// import { current_company } from '../../../store/authStores';
// import { fetchAssets, fetchEmployees, fetchMessages } from '../../../utility/fetch_data';
// import { error } from '@sveltejs/kit';
// import type { PageLoad } from '../firestore/$types';
// import type { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore/lite';

// /** @type {import('./$types').PageLoad} */
// export const load: PageLoad = async () => {
// 	const company = get(current_company);

// 	let local_loaded = false;
// 	let messages: QueryDocumentSnapshot<DocumentData>[] = [];
// 	if (company) {
// 		messages = await fetchMessages(company);
// 		local_loaded = true;
// 	}

// 	return {
// 		messages: messages,
// 		local_loaded: local_loaded
// 	};
// };
