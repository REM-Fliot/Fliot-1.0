import { client_auth } from '$lib/firebase/firebase';
import { RequestMethod } from '../types';

export const fliotGET = async (url: string, uid: string = '') => {
	return await fliotFetch(url, RequestMethod.GET, uid);
};
export const fliotPOST = async (url: string, body: any, uid: string = '') => {
	return await fliotFetch(url, RequestMethod.POST, uid, body);
};
export const fliotDELETE = async (url: string, body: any, uid: string = '') => {
	return await fliotFetch(url, RequestMethod.DELETE, uid, body);
};
export const fliotPUT = async (url: string, body: any, uid: string = '') => {
	return await fliotFetch(url, RequestMethod.PUT, uid, body);
};
export const fliotPATCH = async (url: string, body: any, uid: string = '') => {
	return await fliotFetch(url, RequestMethod.PATCH, uid, body);
};

const fliotFetch = async (
	url: string,
	method: RequestMethod,
	uid: string,
	body: any = undefined
) => {
	const is_authenticated_api = url.startsWith('private');
	let new_uid = uid;
	if (is_authenticated_api) {
		const user = client_auth.currentUser;

		if (!user) {
			throw new Error('User is Undefined');
		}
		console.log(uid);
		console.log(client_auth.currentUser?.uid);
		if (uid == '') {
			new_uid = user.uid;
		}
		console.log(new_uid);
		const response = await user.getIdToken(true).then(async (token) => {
			return await fetch(`/api/${url}?` + new URLSearchParams({ uid: new_uid }), {
				method: method,
				body: JSON.stringify(body),
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			});
		});
		return response;
	} else {
		const response = await fetch(`/api/${url}`, {
			method: method,
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return response;
	}
};
