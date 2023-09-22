import { db } from '$lib/firebase/firebase';
import { doc } from 'firebase/firestore';
import { get } from 'svelte/store';
import { current_company, technician_company, user_type } from '../store/authStores';
import { UserType } from '../types';

export const getProperDoc = (uid: string) => {
	if (get(user_type) === UserType.TECHNICIAN) {
		return doc(db, 'companies', get(current_company)!, 'employees', uid);
	} else {
		//If ENDUSER (for now)
		console.log('COMPANIES: ', get(technician_company), get(current_company));

		return doc(
			db,
			'companies',
			get(technician_company)!,
			'end-users',
			get(current_company)!,
			'employees',
			uid
		);
	}
};
