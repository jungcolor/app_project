// Nodejs 모듈
const path = require('path');
const fs = require('fs');

// 모듈
const server = require('./config/serverConfig'); // http 모듈
const myDB = require('./config/dbConfig'); // DB 모듈

// 상수
const CLINET = 'client';

// cookie check
const parseCookies = (request) => {
    const list = {};
    const cookieHeader = request.headers?.cookie;
    if (!cookieHeader) return list;

    cookieHeader.split(';').forEach((cookie) => {
        let [name, ...rest] = cookie.split("=");

        name = name?.trim();
        if (!name) return;

        const value = rest.join('=').trim();
        if (!value) return;

        list[name] = decodeURIComponent(value);
    });

    return list;
}

const staticServer = (request, response) => {
    try {
        // TODO 파일, url관련 로직 파일 분리
        let { method, url } = request;
        console.log(`[Server] request method ${method}`);
        console.log(`[Server] request url ${url}`);

        const cookieObj = parseCookies(request);

        if (method === "GET") { // GET
            let fileInfo = {};

            // TODO 정리좀 ........
            if (url.indexOf("/login") > -1 && cookieObj.email) {
                url = "/index.html";
            }
    
            if (url === "/" || url === "/index.html") {
                if (cookieObj.email) {
                    fileInfo = {
                        path: path.join(process.cwd(), CLINET, "index.html"),
                        type: 'text/html'
                    }
                }
                else {
                    fileInfo = {
                        path: path.join(process.cwd(), CLINET, "/login/login.html"),
                        type: 'text/html'
                    }
                }
            }
            else {
                fileInfo = {
                    path: path.join(process.cwd(), CLINET, url),
                    type: (url === "/favicon.ico") ? 'image/x-icon' : 'text/html'
                }
            }

            console.log(`filePath >>>>>>>> ${fileInfo.path}`);

            if (fs.existsSync(fileInfo.path)) {
                if (url.indexOf("/login") > -1  && cookieObj.email) {
                    response.writeHead(301, { "Location": `${path.join(process.cwd(), CLINET, "index.html")}` });
                    response.end();
                }
                else {
                    const data = fs.readFileSync(fileInfo.path);
        
                    response.writeHead(200, { "Content-Type": `${fileInfo.type}; charset=utf-8` }); // head
                    response.write(data); // body
                    response.end();
                }
            }
            else {
                response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
                response.write("<h1>404 Not Found</h1>")
                response.end();
            }
        }
        else if (method === "POST") {
            if (url == "/api/login") { // login
                let body = [];

                request.on("data", chunk => {
                    body.push(chunk);
                });
    
                request.on("end", () => {
                    body = body.toString();
                    const sqlQuery = "INSERT INTO usertbl SET ?";
                    const param = JSON.parse(body);

                    myDB.post(sqlQuery, param, (payload) => {
                        const { success, error } = payload;

                        if (success) {
                            response.writeHead(200, {
                                "Content-Type" : "application/json; charset=utf-8",
                                "Set-Cookie": [`email=${param.email}; Path=/;`, `nickname=${param.nickName}; Path=/;`]
                            });
                            response.write(body);
                            response.end();
                        }
                        else {
                            throw new Error(`[Server] Error ${error}`);
                        }
                    });
                });
            }
            else if (url === "/api/getMenu") { // POST api (CORS 해결되면 분리)
                // 쿠키 정보를 가지고 요청하여 DB에서 해당 메뉴를 가져와 랜덤으로 보여준다
                // const filePath = path.join(process.cwd(), url);
                // const menu = require(filePath).getMenu();
                // console.log(menu);
                const sqlQuery = "SELECT * FROM menutbl";

                url = `/server/${url}`;

                myDB.get(sqlQuery, (payload) => {
                    const { success, error } = payload;

                    if (success) {
                        const filePath = path.join(process.cwd(), url);
                        const menu = JSON.stringify(require(filePath).getMenu(payload));
    
                        response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
                        response.write(menu);
                        response.end();
                    }
                    else {
                        throw new Error(`[Server] Error ${error}`);
                    }
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