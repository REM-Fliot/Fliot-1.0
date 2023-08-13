import { error } from "@sveltejs/kit"
import { RequestMethod } from "../types"
import { client_auth } from "$lib/firebase/firebase"


export const fliotGET = async (url: string) => { await fliotFetch(url, RequestMethod.GET) }

const fliotFetch = async (url: string, method: RequestMethod, body: any = undefined) => {
    const is_authenticated_api = url.startsWith('private')

    if (is_authenticated_api) {
        const user = client_auth.currentUser
        if (!user) {
            throw new Error("User is Undefined")
        }
        const response = await user.getIdToken(true).then(async token => {
            const response = await fetch(`/api/${url}`, {
                method: method,
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
        })
        return response
    }
    else {
        const response = await fetch(`/api/${url}`, {
            method: method,
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return response
    }
    
    
}

export const fliotPOST = async (url: string, body: any) => {fliotFetch(url, RequestMethod.POST, body, )}
export const fliotDELETE = async (url: string, body: any) => {fliotFetch(url, RequestMethod.DELETE, body, )}
export const fliotPUT = async (url: string, body: any) => {fliotFetch(url, RequestMethod.PUT, body, )}
export const fliotPATCH = async (url: string, body: any) => {fliotFetch(url, RequestMethod.PATCH, body, )}



