import app from "@/config/firebase";
import { getFirestore, doc, setDoc, addDoc, collection } from "firebase/firestore";

const db = getFirestore(app)

export default async function addData(colllectionName: string, id: string, data: any) {
    let result = null;
    let error = null;

    try {
        result = await setDoc(doc(db, colllectionName, id), data, {
            merge: true,
        });
    } catch (e) {
        error = e;
    }

    return { result, error };
}