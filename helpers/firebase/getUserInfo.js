// helpers/firebase/getUserInfo.js
'use client'; // This indicates a client-side module

import { getAuth } from 'firebase/auth';
import { firebaseApp } from '@/helpers/firebase/firebase'; // Import the initialized Firebase app
import { db } from '@/helpers/firebase/firebase'; // Import your Firestore instance
import { doc, getDoc } from 'firebase/firestore';

export async function getUserInfo() {
    const auth = getAuth(firebaseApp);
    const user = auth.currentUser;

    if (user) {
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

            // Fetch additional customer data from Firestore
            const customerDocRef = doc(db, 'customers', user.uid);
            const customerDocSnap = await getDoc(customerDocRef);

            let customerData = null;
            if (customerDocSnap.exists()) {
                customerData = customerDocSnap.data();
            } else {
                console.log("No customer data found for UID:", user.uid);
                customerData = {}; // Or handle as needed
            }

            return { ...basicUserInfo, customerData };

        } catch (error) {
            console.error("Error getting user info (client-side):", error);
            return null;
        }
    } else {
        return null; // No user logged in on the client-side
    }
}
