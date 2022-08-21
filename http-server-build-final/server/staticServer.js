// Nodejs 모듈
const path = require('path');
const fs = require('fs');

// 모듈
const server = require('./config/serverConfig'); // http 모듈
const myDB = require('./config/dbConfig'); // DB 모듈

// 상수
const CLINET = 'client';
const ROOT = '/login.html';

function staticServer (request, response) {
    try {
        // TODO 파일, url관련 로직 파일 분리
        const { method, url } = request;
        console.log(`[Server] request method ${method}`);
        console.log(`[Server] request url ${url}`);
        // console.log(`[Server] cwd ${process.cwd()}`)
        // console.log(`[Server] dirname ${__dirname}`);

        if (method === "GET") { // GET
            let fileInfo = {};
    
            if (url === "/") { // url이 root이거나 사용자 쿠키가 존재하지 않으면 로그인 페이지로 이동
                fileInfo = {
                    path: path.join(process.cwd(), '../', CLINET, '/login/', ROOT),
                    type: 'text/html'
                }
            }
            else {
                fileInfo = {
                    path: path.join(process.cwd(), '../', CLINET, url),
                    type: (url === "/favicon.ico") ? 'image/x-icon' : 'text/html'
                }
            }

            console.log(`fileInfo >>>>>>>> ${fileInfo.path}`);

            if (fs.existsSync(fileInfo.path)) {
                const data = fs.readFileSync(fileInfo.path);
    
                response.writeHead(200, { "Content-Type": `${fileInfo.type}; charset=utf-8` }); // head
                response.write(data); // body
                response.end();
            }
            else {
                response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
                response.write("<h1>404 Not Found</h1>")
                response.end();
            }
        }
        else if (method === "POST") {
            // POST api (CORS 해결되면 분리)
            if (url == "/api/login") { // login
                let body = [];

                request.on("data", chunk => {
                    body.push(chunk);
                });
    
                request.on("end", () => {
                    body = body.toString();
                    const sqlQuery = "INSERT INTO usertbl SET ?";
                    const param = JSON.parse(body);

                    myDB.post(sqlQuery, param, ({ err, payload }) => {
                        if (err) throw new Error(`[Server] DB error ${err}`);

                        response.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
                        response.write(body);
                        response.end();
                    });
                });
            }
            else if (url === "/api/getMenu") {
                // 쿠키 정보를 가지고 요청하여 DB에서 해당 메뉴를 가져와 랜덤으로 보여준다
                // const filePath = path.join(process.cwd(), url);
                // const menu = require(filePath).getMenu();
                // console.log(menu);
                const sqlQuery = "SELECT * FROM menutbl";

                myDB.get(sqlQuery, ({ err, payload }) => {
                    if (err) throw new Error(`[Server] DB error ${err}`);
                    const filePath = path.join(process.cwd(), url);
                    const menu = JSON.stringify(require(filePath).getMenu(payload));

                    response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
                    response.write(menu);
                    response.end();
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

// server create
server.init(staticServer);
server.createServer();

// DB connect
myDB.init();
myDB.connect();