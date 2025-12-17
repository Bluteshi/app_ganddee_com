const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // Handle redirects as per netlify.toml
    if (pathname.startsWith('/playstore')) {
        res.writeHead(200, { 'Location': 'https://play.google.com/store/apps/details?id=com.bluteshi.ganddee' });
        res.end();
        return;
    }
    if (pathname.startsWith('/appstore')) {
        res.writeHead(200, { 'Location': 'https://apps.apple.com/gb/app/ganddee/id6457107823' });
        res.end();
        return;
    }
    if (pathname.startsWith('/desktop')) {
        res.writeHead(301, { 'Location': 'https://www.ganddee.com/broken-app-link' });
        res.end();
        return;
    }

    // Serve static files
    let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);

    // Check if file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // Serve 404.html for any unmatched route
            filePath = path.join(__dirname, '404.html');
        }

        const ext = path.extname(filePath);
        const contentType = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpg',
            '.ico': 'image/x-icon'
        }[ext] || 'text/plain';

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    });
});

const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});