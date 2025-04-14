// helpers/firebase/getUserInfo.js
'use client'; // This indicates a client-side module

import { getAuth } from 'firebase/auth';
import { firebaseApp } from '@/helpers/firebase/firebase'; // Import the initialized Firebase app

export async function getUserClientSide() {
    // Get the auth service from the existing firebaseApp instance
    const auth = getAuth(firebaseApp);
    const user = auth.currentUser;

    if (user) {
        try {
            const idToken = await user.getIdToken();
            return {
                uid: user.uid,
                email: user.email,
                emailVerified: user.emailVerified,
                displayName: user.displayName,
                photoURL: user.photoURL,
                phoneNumber: user.phoneNumber,
                accessToken: idToken, // The JWT token
                // Add other relevant client-side user properties
            };
        } catch (error) {
            console.error("Error getting ID token (client-side):", error);
            return null;
        }
    } else {
        return null; // No user logged in on the client-side
    }
}
