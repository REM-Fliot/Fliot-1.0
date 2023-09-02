import type { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { get } from 'svelte/store';
import { current_company } from '../../../../store/authStores';
import { fetchMessages } from '../../../../utility/fetch_data';
import type { PageLoad } from '../../firestore/$types';

/** @type {import('./$types').PageLoad} */
export const load: PageLoad = async ({ params }: any) => {
	const company = get(current_company);

	let local_loaded = false;
	let messages: QueryDocumentSnapshot<DocumentData>[] = [];
	if (company) {
		messages = await fetchMessages(company, params.chat_id);
		local_loaded = true;
	}

	return {
		messages: messages,
		chat_id: params.chat_id,
		local_loaded: local_loaded
	};
};
