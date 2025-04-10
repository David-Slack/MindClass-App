import { adminAuth } from '@/helpers/firebase/firebaseAdmin';
import { serialize } from 'cookie';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const authHeader = req.headers.authorization;
        const { rememberMe } = req.body; // Get rememberMe from the request body

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const idToken = authHeader.split('Bearer ')[1];

        try {
            const decodedToken = await adminAuth.verifyIdToken(idToken);
            const uid = decodedToken.uid;

            // Determine maxAge based on rememberMe
            const oneDayInSeconds = 60 * 60 * 24;
            const sixMonthsInSeconds = 60 * 60 * 24 * 30 * 6; // Approximately 6 months (assuming 30 days per month)
            const maxAge = rememberMe ? sixMonthsInSeconds : oneDayInSeconds;

            const sessionToken = await adminAuth.createCustomToken(uid);
            const cookie = serialize('session', sessionToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: 'strict',
                maxAge: maxAge, // Use the conditional maxAge
                path: '/',
            });
            res.setHeader('Set-Cookie', cookie);

            return res.status(200).json({ message: 'Login successful' });
        } catch (error) {
            console.error('ID token verification error:', error);
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
