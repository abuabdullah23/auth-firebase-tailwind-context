import React, { createContext, useEffect, useState } from 'react';
import app from '../../firebase/firebase-config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProviders = ({ children }) => {
    const [user, setUser] = useState(null);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // for login
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    // for user log out
    const userLogOut = () => {
        return signOut(auth);
    }

    const authInfo = {
        user,
        createUser,
        signIn,
        userLogOut,
    }

    // observe auth state change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('auth state change:', currentUser);
            setUser(currentUser);
        });

        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;