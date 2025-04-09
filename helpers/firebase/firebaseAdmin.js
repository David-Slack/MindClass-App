import admin from 'firebase-admin';

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS))
        });
    } catch (error) {
        console.error('Firebase Admin initialization error', error.stack);
    }
}

export const adminAuth = admin.auth();
export const adminDb = admin.firestore(); // If you use Firestore
