import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    // TODO: We need server side auth for this to be safe
    // Replace with your actual authentication logic
    /*const isAuthenticated = req.headers.authorization; // Example: using Authorization header

    if (!isAuthenticated) {
        return res.status(401).json({ message: 'Unauthorized' });
    }*/

    const { slug } = req.query;
    const filePath = path.join(process.cwd(), 'courses', ...slug);

    try {
        const fileContent = fs.readFileSync(filePath);
        const contentType = getContentType(filePath); // Function to determine content type

        res.setHeader('Content-Type', contentType);
        res.send(fileContent);
    } catch (error) {
        res.status(404).json({ message: 'File not found' });
    }
}

function getContentType(filePath) {
    const extname = path.extname(filePath);
    switch (extname) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'text/javascript';
        case '.png':
            return 'image/png';
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.gif':
            return 'image/gif';
        // Add more content types as needed
        default:
            return 'application/octet-stream';
    }
}
