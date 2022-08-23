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

        if (method === "GET") {
            if (url === "/api/getMenu") {
                const sqlQuery = "SELECT * FROM menutbl";

                url = `/server/${url}`;

                myDB.get(sqlQuery, (payload) => {
                    const { success, error } = payload;

                    if (success) {
                        const filePath = path.join(process.cwd(), url);
                        const menu = JSON.stringify(require(filePath).getMenu(payload));

                        response.writeHead(200, cors.getCORSConfig());
                        response.write(menu);
                        response.end();
                    }
                    else {
                        throw new Error(`[Server] Error ${error}`);
                    }
                });
            }
        }
        else if (method === "POST") {
            if (url === "/api/menuList") {
                console.log(`[Server] menuList Call`);
                let body = [];

                request.on("data", chunk => {
                    body.push(chunk);
                });

                request.on("end", () => {
                    body = body.toString();

                    console.log(body);
                    const sqlQuery = "INSERT INTO menulisttbl SET ?";
                    const param = JSON.parse(body);

                    myDB.post(sqlQuery, param, (payload) => {
                        const { success, error } = payload;

                        if (success) {
                            response.writeHead(200, cors.getCORSConfig());
                            response.write(body);
                            response.end();
                        }
                        else {
                            response.writeHead(200, cors.getCORSConfig());
                            response.write(JSON.stringify(param));
                            response.end();
                        }
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