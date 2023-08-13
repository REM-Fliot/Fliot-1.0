import { get } from 'svelte/store';
import { fetchAssets } from '../../../utility/fetch_data';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { current_company } from '../../../store/authStores';
import { client_auth } from '$lib/firebase/firebase';
import type { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore/lite';

export const load: PageLoad = async () => {
	const company = get(current_company);

	let local_loaded = false;
	let assets: QueryDocumentSnapshot<DocumentData>[] = [];

	if (company) {
		assets = await fetchAssets(company);
		local_loaded = true;
	}

	return {
		assets: assets,
		local_loaded: local_loaded
	};
};
