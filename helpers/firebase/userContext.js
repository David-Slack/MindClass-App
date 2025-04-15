'use client';

import { createContext, useState, useEffect, useContext } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseApp } from '@/helpers/firebase/firebase';
import { db } from '@/helpers/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth(firebaseApp);
        const storedUserData = localStorage.getItem('userData');

        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
            setLoading(false);
        }

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setLoading(true);
                try {
                    const idToken = await user.getIdToken();
                    const basicUserInfo = {
                        uid: user.uid,
                        email: user.email,
                        emailVerified: user.emailVerified,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        phoneNumber: user.phoneNumber,
                        accessToken: idToken,
                    };

                    const customerDocRef = doc(db, 'customers', user.uid);
                    const customerDocSnap = await getDoc(customerDocRef);
                    const customerData = customerDocSnap.exists() ? customerDocSnap.data() : {};

                    const fullUserData = { ...basicUserInfo, customerData };
                    setUserData(fullUserData);
                    localStorage.setItem('userData', JSON.stringify(fullUserData));
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setUserData(null);
                    localStorage.removeItem('userData');
                } finally {
                    setLoading(false);
                }
            } else {
                setUserData(null);
                localStorage.removeItem('userData');
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{ userData, loading }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
