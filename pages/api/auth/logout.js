import { serialize } from 'cookie';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Clear the session cookie
        const cookie = serialize('session', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 0, // Expire the cookie immediately
            path: '/',
        });
        res.setHeader('Set-Cookie', cookie);
        return res.status(200).json({ message: 'Logout successful' });
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
