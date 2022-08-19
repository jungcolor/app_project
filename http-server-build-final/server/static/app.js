const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = 3030;
const CLINET = 'client';

const server = http.createServer((req, res) => {
    try {
        // TODO 파일, url관련 로직 파일 분리
        const method = req.method;
        const url = req.url;
        console.log(`[Server] request method ${method}`);
        console.log(`[Server] request url ${url}`);

        const fileInfo = {};

        if (url === "/") {
            fileInfo.path = path.join(process.cwd(), CLINET, 'index.html');
            fileInfo.type = 'text/html';
        }
        else {
            fileInfo.path = path.join(process.cwd(), CLINET, url);
            fileInfo.type = (url === "/favicon.ico") ? 'image/x-icon' : 'text/html';
        }

        if (fs.existsSync(fileInfo.path)) {
            const data = fs.readFileSync(fileInfo.path);

            res.writeHead(200, { "Content-Type": `${fileInfo.type}; charset=utf-8` }); // head
            res.write(data); // body
            res.end(); // body
        }
        else {
            res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
            res.write(`<h1>404 Not Found</h1>`)
            res.end();
        }
    }
    catch (error) {
        console.log(`[Server] Error ${error}`);
        res.write(`<h1>Server Error!!!!</h1>`);
        res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
        res.end(error.message);
    }
});

server.listen(PORT, () => {
    console.log(`[Server] listening on port ${PORT}`);
});
