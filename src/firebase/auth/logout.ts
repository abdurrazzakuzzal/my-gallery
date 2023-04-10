import app from "@/config/firebase";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth(app);

export default async function logout() {
    let result = null,
        error = null;
    try {
        result = await signOut(auth);
    } catch (e) {
        error = e;
    }

    return { result, error };
}