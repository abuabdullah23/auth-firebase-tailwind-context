import React, { createContext, useEffect, useState } from 'react';
import app from '../../firebase/firebase-config';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const googleAuthProvider = new GoogleAuthProvider();

const AuthProviders = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // for login
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    // google sign in
    const signInWithGoogle = () =>{
        return signInWithPopup(auth, googleAuthProvider);
    }

    // for user log out
    const userLogOut = () => {
        return signOut(auth);
    }

    // observe auth state change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('auth state change:', currentUser);
            setUser(currentUser);

            setLoading(false);
        });

        return () => {
            unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        userLogOut,
        signInWithGoogle,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;