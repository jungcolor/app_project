// 모듈 가져오는 부분 분리
const http = require('http');
const path = require('path');
const fs = require('fs');

// 상수
const PORT = 3030;
const CLINET = 'client';
const ROOT = '/login.html';

// DB 파일 분리
const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1q2w3e4r',
    database: 'testdb' // 이거해야함
});

// server 파일 분리
const server = http.createServer(doRequest);
server.listen(PORT, () => {
    console.log(`[Server] listening on port ${PORT}`);
});

async function doRequest (request, response) {
    try {
        // TODO 파일, url관련 로직 파일 분리
        const { method, url } = request;
        console.log(`[Server] request method ${method}`);
        console.log(`[Server] request url ${url}`);

        if (method === "GET") { // GET
            let fileInfo = {};
    
            if (url === "/") { // url이 root이거나 사용자 쿠키가 존재하지 않으면 로그인 페이지로 이동
                fileInfo = {
                    path: path.join(process.cwd(), CLINET, '/login/', ROOT),
                    type: 'text/html'
                }
            }
            else {
                fileInfo = {
                    path: path.join(process.cwd(), CLINET, url),
                    type: (url === "/favicon.ico") ? 'image/x-icon' : 'text/html'
                }
            }

            if (fs.existsSync(fileInfo.path)) {
                const data = fs.readFileSync(fileInfo.path);
    
                response.writeHead(200, { "Content-Type": `${fileInfo.type}; charset=utf-8` }); // head
                response.write(data); // body
                response.end();
            }
            else {
                response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
                response.write(`<h1>404 Not Found</h1>`)
                response.end();
            }
        }
        else if (method === "POST") { // POST api
            if (url == "/api/login") { // login
                let body = [];

                request.on('data', chunk => {
                    body.push(chunk);
                });
    
                request.on('end', () => {
                    body = body.toString();

                    if (body) { // 로그인 성공
                        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                        response.end(body); // DB에서 조회한 데이터 client로 내려줄때
                    }
                    // else { // 동일한 메일 있음
                    //     response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                    //     response.end(body);
                    // }
                });
            }
        }
    }
    catch (error) {
        console.log(`[Server] Error ${error}`);
        response.write(`<h1>Server Error!!!!</h1>`);
        response.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
        response.end(error.message);
    }
}