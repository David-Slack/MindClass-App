'use client';

import { createContext, useState, useEffect, useContext } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseApp } from '@/helpers/firebase/firebase';
import { db } from '@/helpers/firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

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
                    const customerDataFromFirestore = customerDocSnap.exists() ? customerDocSnap.data() : {};

                    const currentLastLoginDate = userData?.customerData?.lastLoginDate;
                    const currentLoginStreak = userData?.customerData?.loginStreak || 0;
                    const todayUTC = new Date();
                    const storedDayUTC = currentLastLoginDate ? new Date(currentLastLoginDate) : null;

                    let lastLoginDateToUpdate = currentLastLoginDate;
                    let loginStreakToUpdate = currentLoginStreak;

                    const todayUTCDayString = todayUTC.toLocaleDateString('en-GB', {
                        timeZone: 'UTC',
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    });
                    const storedDayUTCDayString = storedDayUTC?.toLocaleDateString('en-GB', {
                        timeZone: 'UTC',
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    });

                    if (!storedDayUTCDayString || storedDayUTCDayString !== todayUTCDayString) {
                        lastLoginDateToUpdate = todayUTC.toISOString();
                        if (storedDayUTC) {
                            const yesterdayUTC = new Date(todayUTC);
                            yesterdayUTC.setUTCDate(todayUTC.getUTCDate() - 1);
                            const yesterdayUTCDayString = yesterdayUTC.toLocaleDateString('en-GB', {
                                timeZone: 'UTC',
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                            });
                            if (storedDayUTCDayString === yesterdayUTCDayString) {
                                loginStreakToUpdate = currentLoginStreak + 1;
                            } else {
                                loginStreakToUpdate = 1;
                            }
                        } else {
                            loginStreakToUpdate = 1; // First login
                        }

                        await updateDoc(customerDocRef, {
                            lastLoginDate: lastLoginDateToUpdate,
                            loginStreak: loginStreakToUpdate,
                        });
                    } else if (customerDataFromFirestore?.lastLoginDate && !userData?.customerData?.lastLoginDate) {
                        lastLoginDateToUpdate = customerDataFromFirestore.lastLoginDate;
                        loginStreakToUpdate = customerDataFromFirestore.loginStreak || 0;
                    }

                    const updatedCustomerData = { ...customerDataFromFirestore, lastLoginDate: lastLoginDateToUpdate, loginStreak: loginStreakToUpdate };
                    const fullUserData = { ...basicUserInfo, customerData: updatedCustomerData };
                    setUserData(fullUserData);
                    localStorage.setItem('userData', JSON.stringify(fullUserData));
                } catch (error) {
                    console.error("Error fetching/updating user data:", error);
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
    }, [userData?.customerData?.lastLoginDate, userData?.customerData?.loginStreak]);

    return (
        <UserContext.Provider value={{ userData, loading }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
