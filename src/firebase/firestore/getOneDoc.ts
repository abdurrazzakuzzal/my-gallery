import app from "@/config/firebase";
import { getFirestore, doc, getDoc, } from "firebase/firestore";

const db = getFirestore(app)

export default async function getOneDoument(collection: string, id: any) {
    let docRef = doc(db, collection, id);

    let result = null;
    let error = null;

    try {
        const respone = await getDoc(docRef);
        if (respone.exists()) {
            result = respone.data();
        } else {
            console.log("Document does not exist")
        }
    } catch (e) {
        error = e;
    }

    return { result, error };
}