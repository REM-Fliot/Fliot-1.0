import { db } from "$lib/firebase/firebase"
import { QueryDocumentSnapshot, collection, getDocs, type DocumentData, doc, getDoc } from "firebase/firestore/lite"
import { auth_user } from "../store/authUser"
import { get } from "svelte/store"

const fetchAssets = async () => {
    let assets:Array<QueryDocumentSnapshot<DocumentData>> = []
    const user = get(auth_user)
    if (user) {
        const doc_ref = doc(db,"users",user.uid)
        const doc_snap = await getDoc(doc_ref)
        console.log(doc_snap.exists())
        if (doc_snap.exists()) {
            const data = doc_snap.data()
        }
    }
    
    return assets
}


export default fetchAssets
