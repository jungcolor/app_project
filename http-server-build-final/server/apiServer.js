// Nodejs 모듈
const path = require('path');
const fs = require('fs');

// 모듈
const server = require('./config/serverConfig'); // http 모듈
const myDB = require('./config/dbConfig'); // DB 모듈
const cors = require('./config/corsConfig'); // cors config

// 상수
const PORT = 3040;

const apiServer = (request, response) => {
    try {
        // TODO 파일, url관련 로직 파일 분리
        let { method, url } = request;
        console.log(`[Server] request method ${method}`);
        console.log(`[Server] request url ${url}`);

        if (method === "POST") {
            if (url === "/api/menu/item") {
                let body = '';

                request.on('data', chunk => {
                    body += chunk;
                });

                request.on('end', () => {
                    const sqlQuery = `SELECT * FROM menulisttbl WHERE email=?`;
                    const param = JSON.parse(body);

                    url = `/server${url}`;

                    myDB.post(sqlQuery, param, (error, payload) => {
                        const filePath = path.join(process.cwd(), url);
                        const menu = JSON.stringify(require(filePath).getMenu(payload));

                        response.writeHead(200, cors.getCORSConfig());
                        response.write(menu);
                        response.end();
                    });
                });
            }
            else if (url === "/api/menu/save") {
                let body = '';

                request.on("data", chunk => {
                    body += chunk;
                });

                request.on("end", () => {
                    const sqlQuery = "INSERT INTO menulisttbl SET ?";
                    const param = JSON.parse(body);

                    myDB.post(sqlQuery, param, (error, payload) => {
                        response.writeHead(200, cors.getCORSConfig());
                        response.write(body);
                        response.end();
                    });
                });                
            }
            else if (url === "/api/menu/list") {
                let body = '';

                request.on('data', chunk => {
                    body += chunk;
                });

                request.on('end', () => {
                    const sqlQuery = "SELECT * FROM menulisttbl WHERE email=?";
                    const param = JSON.parse(body);

                    myDB.post(sqlQuery, param, (error, payload) => {
                        response.writeHead(200, cors.getCORSConfig());
                        response.write(JSON.stringify(payload));
                        response.end();
                    });
                });
            }
        }
        else if (method === "OPTIONS") {
            response.writeHead(200, cors.getCORSConfig());
            response.end();
        }
    }
    catch (error) {
        console.log(`[Server] Error ${error}`);
        response.write(`<h1>Server Error!!!!</h1>`);
        response.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
        response.end(error.message);
    }
}

server.init(apiServer, PORT);
server.createServer();

// DB connect
myDB.init();
myDB.connect();