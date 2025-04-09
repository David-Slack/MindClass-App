import { adminAuth } from '@/helpers/firebase/firebaseAdmin';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const sessionCookie = req.cookies.session;

        if (!sessionCookie) {
            return res.status(401).json({ isAuthenticated: false });
        }

        try {
            // Verify the ID token (if you used createCustomToken, you might need a different approach)
            const decodedToken = await adminAuth.verifyIdToken(sessionCookie);
            // Token is valid
            return res.status(200).json({ isAuthenticated: true, uid: decodedToken.uid });
        } catch (error) {
            // Token is invalid or expired
            console.error('Verification error:', error);
            return res.status(401).json({ isAuthenticated: false });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
