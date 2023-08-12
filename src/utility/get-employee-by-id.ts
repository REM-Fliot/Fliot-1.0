import { db } from "$lib/firebase/firebase";
import { error } from "@sveltejs/kit";
import { collection, getDocs, limit, query, where } from "firebase/firestore/lite";


export const getEmployeeById = async (company: string, email:string) => {
    let id = undefined
    const col_ref = collection(db,"companies",company,"employees")
    await getDocs(query(col_ref,where("EMAIL","==",email),limit(1))).then(async snapshot => {
        if (snapshot.empty) {
            throw new Error("No email by that name")
        }
        snapshot.forEach(doc => {
            id = doc.id
        })
    }).catch(err => {
        throw new Error(err)
    })
    return id;
}
