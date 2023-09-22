import type { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { get } from 'svelte/store';
import { current_company, technician_company, user_type } from '../../../../store/authStores';
import { UserType } from '../../../../types';
import { fetchEmployees } from '../../../../utility/fetch_data';
import type { PageLoad } from '../../firestore/$types';

/** @type {import('./$types').PageLoad} */
export const load: PageLoad = async () => {
	const company = get(current_company);
	const tech_company = get(technician_company);

	let local_loaded = false;
	let employees: QueryDocumentSnapshot<DocumentData>[] = [];
	if (company && tech_company !== undefined) {
		if (get(user_type) === UserType.TECHNICIAN) {
			employees = await fetchEmployees(company, true);
		} else if (get(user_type) === UserType.ENDUSER) {
			employees = await fetchEmployees(company, false, tech_company);
		}
		local_loaded = true;
	}

	return {
		employees: employees,
		local_loaded: local_loaded
	};
};
