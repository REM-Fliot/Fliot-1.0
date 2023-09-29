import type { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { get } from 'svelte/store';
import { current_company } from '../../../../../store/authStores';
import { fetchAssets, fetchFsrTemplates } from '../../../../../utility/fetch_data';
import type { PageLoad } from '../../../firestore/$types';

/** @type {import('./$types').PageLoad} */
export const load: PageLoad = async () => {
	console.log('LOADED');
	const company = get(current_company);
	console.log(company);

	let loaded = false;
	let assets: QueryDocumentSnapshot<DocumentData>[] = [];
	let templates: QueryDocumentSnapshot<DocumentData>[] = [];
	if (company) {
		assets = await fetchAssets(company);
		templates = await fetchFsrTemplates(company);
		loaded = true;
	}

	return {
		assets: assets,
		templates: templates,
		loaded: loaded
	};
};
