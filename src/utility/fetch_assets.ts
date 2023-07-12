import { db } from "$lib/firebase/firebase"
import { QueryDocumentSnapshot, collection, getDocs, type DocumentData } from "firebase/firestore/lite"

const fetchAssets = async () => {
    let assets:Array<QueryDocumentSnapshot<DocumentData>> = []

    const col_ref = collection(db,"assets")
    await getDocs(col_ref).then(snapshot=>{
        snapshot.docs.forEach((doc)=>{
            assets.push(doc);
        })
    })
    return assets
}


export default fetchAssets
