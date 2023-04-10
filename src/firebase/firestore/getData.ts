import app from "@/config/firebase";
import { getFirestore, doc, getDoc, collection, getDocs } from "firebase/firestore";

const db = getFirestore(app)

export default async function getDoument(collectionName: string, id: string) {
    // let docRef = doc(db, collectionName, id);

    let result = null;
    let error = null;

    try {
        // result = await getDoc(docRef);
        const colRef = collection(db, collectionName);
        const docsSnap = await getDocs(colRef);
        let data : any[] = [];
        docsSnap.forEach(doc => {
            data.push(doc.data());
        })
        result = data;
    } catch (e) {
        error = e;
    }

    return { result, error };
}