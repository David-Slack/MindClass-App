'use server';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { sessionCookie } = req.body;

        if (!sessionCookie) {
            return res.status(401).json({ isValid: false });
        }

        return res.status(200).json({ isValid: true });

    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
