import app from "@/config/firebase";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const auth = getAuth(app);

export default async function forgotPassword(email: string) {
    let result = null,
        error = null;
    try {
        result = await sendPasswordResetEmail(auth, email, {
            url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/auth/login`
        });
    } catch (e) {
        error = e;
    }

    return { result, error };
}