import { serialize } from 'cookie';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Clear the session cookie by setting its maxAge to 0 and path to '/'
        const clearedCookie = serialize('session', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 0,
            path: '/',
        });

        res.setHeader('Set-Cookie', clearedCookie);
        return res.status(200).json({ message: 'Sign out successful' });
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
