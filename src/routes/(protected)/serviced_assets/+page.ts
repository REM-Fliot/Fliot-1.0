import { get } from 'svelte/store';
import { current_company } from '../../../store/authStores';
import { fetchAssets, fetchEmployees } from '../../../utility/fetch_data';
import { error } from '@sveltejs/kit';
import type { PageLoad } from '../firestore/$types';
import type { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore/lite';

/** @type {import('./$types').PageLoad} */
export const load: PageLoad = async () => {
	console.log('LOADED');
	const company = get(current_company);

	let loaded = false;
	let assets: QueryDocumentSnapshot<DocumentData>[] = [];
	if (company) {
		assets = await fetchAssets(company);
		loaded = true;
	}

	return {
		assets: assets,
		loaded: loaded
	};
};
