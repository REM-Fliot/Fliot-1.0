import type { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { get } from 'svelte/store';
import { current_company } from '../../../store/authStores';
import { fetchAssets } from '../../../utility/fetch_data';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const company = get(current_company);
	// loaded.set(false);

	let local_loaded = false;
	let assets: QueryDocumentSnapshot<DocumentData>[] = [];

	if (company) {
		console.log('loaded assets');
		assets = await fetchAssets(company);
		local_loaded = true;
		// loaded.set(true);
	}

	return {
		assets: assets,
		local_loaded: local_loaded
	};
};
