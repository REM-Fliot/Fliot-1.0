import type { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { get } from 'svelte/store';
import { current_company } from '../../../store/authStores';
import { fetchAssets, fetchEndUsers } from '../../../utility/fetch_data';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const company = get(current_company);
	// loaded.set(false);

	let local_loaded = false;
	let assets: QueryDocumentSnapshot<DocumentData>[] = [];
	let sub_companies: string[] = [];

	if (company) {
		assets = await fetchAssets(company);
		const end_users = await fetchEndUsers(company);
		end_users.forEach((sub_company) => {
			sub_companies.push(sub_company.id);
		});
		local_loaded = true;
	}

	return {
		assets: assets,
		sub_companies: sub_companies,
		local_loaded: local_loaded
	};
};
