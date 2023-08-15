import { get } from 'svelte/store';
import { error } from '@sveltejs/kit';
import admin_auth from '$lib/firebase/firebase_admin';
import { RequestMethod, Roles } from '../types';
import { client_auth } from '$lib/firebase/firebase';

export const convertRoleToClaim = async (role: Roles) => {
	switch (role) {
		case Roles.ADMIN:
			return {
				admin: true
			};
		case Roles.TECHNICIAN:
			return {
				technician: true
			};
		case Roles.ENDUSER:
			return {
				enduser: true
			};
		default:
			throw new Error('Invalid Role');
	}
};
