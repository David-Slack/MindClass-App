import { adminAuth } from '@/helpers/firebase/firebaseAdmin';
import { serialize } from 'cookie';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        try {
            const user = await adminAuth.getUserByEmail(email);
            // In a real application, you would verify the password securely
            // (Firebase Admin SDK doesn't directly provide password verification).
            // You might need to store password hashes in your database
            // or use Firebase Authentication's built-in email/password sign-in
            // and then verify the ID token.

            // For demonstration purposes, let's assume the user exists.
            // In a real scenario, you'd likely use Firebase Authentication
            // to sign in the user and get an ID token.

            // **Important:** If you are migrating from client-side auth,
            // you might need to handle the initial password verification
            // using the client-side SDK once and then transition to
            // server-side session management.

            // After successful authentication (e.g., verifying password),
            // you can create a custom token or directly establish a session.

            // Example: Creating a custom token (optional, but often useful)
            const customToken = await adminAuth.createCustomToken(user.uid);

            // Set an HTTP-only cookie with the custom token or a session ID
            const cookie = serialize('session', customToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development', // Set to true in production
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 7, // 7 days
                path: '/',
            });
            res.setHeader('Set-Cookie', cookie);

            return res.status(200).json({ message: 'Login successful' });
        } catch (error) {
            console.error('Login error:', error);
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
