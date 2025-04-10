import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

Object.keys(firebaseCredentials).forEach((key) => {
    const configValue = firebaseCredentials[key] + "";
    if (configValue.charAt(0) === '"') {
        firebaseCredentials[key] = configValue.substring(1, configValue.length - 1);
    }
});

export const firebaseApp =
    getApps().length === 0 ? initializeApp(firebaseCredentials) : getApps()[0];

export const db = getFirestore(firebaseApp);

export default firebaseApp;
