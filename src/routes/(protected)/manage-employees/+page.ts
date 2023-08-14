import { get } from 'svelte/store';
import { current_company } from '../../../store/authStores';
import { fetchEmployees } from '../../../utility/fetch_data';
import { error } from '@sveltejs/kit';
import type { PageLoad } from '../firestore/$types';
import type { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

/** @type {import('./$types').PageLoad} */
export const load: PageLoad = async () => {
	const company = get(current_company);

	let local_loaded = false;
	let employees: QueryDocumentSnapshot<DocumentData>[] = [];
	if (company) {
		employees = await fetchEmployees(company);
		local_loaded = true;
	}

	return {
		employees: employees,
		local_loaded: local_loaded
	};
};
