import { client_auth } from '$lib/firebase/firebase';
import { RequestMethod } from '../types';

export const fliotGET = async (url: string) => {
	return await fliotFetch(url, RequestMethod.GET);
};
export const fliotPOST = async (url: string, body: any) => {
	return await fliotFetch(url, RequestMethod.POST, body);
};
export const fliotDELETE = async (url: string, body: any) => {
	return await fliotFetch(url, RequestMethod.DELETE, body);
};
export const fliotPUT = async (url: string, body: any) => {
	return await fliotFetch(url, RequestMethod.PUT, body);
};
export const fliotPATCH = async (url: string, body: any) => {
	return await fliotFetch(url, RequestMethod.PATCH, body);
};

const fliotFetch = async (url: string, method: RequestMethod, body: any = undefined) => {
	const is_authenticated_api = url.startsWith('private');
	console.log(body);

	if (is_authenticated_api) {
		const user = client_auth.currentUser;
		if (!user) {
			throw new Error('User is Undefined');
		}
		const response = await user.getIdToken(true).then(async (token) => {
			return await fetch(`/api/${url}?` + new URLSearchParams({ uid: user.uid }), {
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
