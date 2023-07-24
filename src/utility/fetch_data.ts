import { db } from "$lib/firebase/firebase"
import { get } from 'svelte/store';
import { QueryDocumentSnapshot, collection, getDocs, type DocumentData } from "firebase/firestore/lite"
import { auth_user } from "../store/authUser"

export const fetchAssets = async (company: string) => {
    let assets:Array<QueryDocumentSnapshot<DocumentData>> = []

    const col_ref = collection(db,"companies",company,"assets")
    await getDocs(col_ref).then(snapshot=>{
        snapshot.docs.forEach((doc)=>{
            assets.push(doc);
        })
    })
    return assets
}
export const fetchEmployees = async (company: string) => {
    let employees:Array<QueryDocumentSnapshot<DocumentData>> = []

    const col_ref = collection(db,"companies",company,"employees")
    await getDocs(col_ref).then(snapshot=>{
        snapshot.docs.forEach((doc)=>{
            employees.push(doc);
        })
    })
    return employees
}

