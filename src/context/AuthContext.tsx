import React from 'react';
import {
    onAuthStateChanged,
    getAuth,
    User,
} from 'firebase/auth';
import app from '@/config/firebase';
import { CircularProgress } from '@mui/material';

interface IAuthContextProps {
    children: React.ReactNode
}

const auth = getAuth(app);

export const AuthContext = React.createContext<User | null>(null);

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }: IAuthContextProps) => {

    const [user, setUser] = React.useState<User | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={user}>
            {loading ? <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
                <CircularProgress size={"5rem"} />
            </div> : children}
        </AuthContext.Provider>
    )
}