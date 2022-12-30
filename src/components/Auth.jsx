import React, { useEffect ,useState, createContext} from "react"
import firebaseConfig from "../firebase_config"

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        firebaseConfig.auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
}