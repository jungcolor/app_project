// Nodejs 모듈
const path = require('path');
const fs = require('fs');

// 모듈
const server = require('./config/serverConfig'); // http 모듈
const myDB = require('./config/dbConfig'); // DB 모듈
const cookie = require('./config/cookieConfig'); // cookie 모듈

// 상수
const CLINET = 'client';

const staticServer = (request, response) => {
    try {
        // TODO 파일, url관련 로직 파일 분리
        const { method, url } = request;
        cookie.init(request);
        const cookieData = cookie.getCookie();
        const pathInfo = { url: '', redirect: false };
        let extenstion = path.extname(url);

        console.log(`[Server] request method ${method}`);
        console.log(`[Server] request url ${url}`);

        if (method === "GET") { // GET

            if (!extenstion) {
                extenstion = ".html";
            }

            if (cookieData?.email) {
                if (url === "/" || url.indexOf("/login") > -1) {
                    pathInfo.url = path.join(process.cwd(), CLINET, `/index${extenstion}`);
                    pathInfo.redirect = true;
                }
                else {
                    pathInfo.url = path.join(process.cwd(), CLINET, url);
                    pathInfo.redirect = false;
                }
            }
            else {
                if (url.indexOf("/login") < 0) {
                    pathInfo.url = path.join(process.cwd(), CLINET, "/login", `login${extenstion}`);
                    pathInfo.redirect = true;
                }
                else {
                    pathInfo.url = path.join(process.cwd(), CLINET, url);
                    pathInfo.redirect = false;
                }
            }            

            console.log(`filePath >>>>>>>> ${pathInfo.url}`);

            if (fs.existsSync(pathInfo.url)) {
                const resFile = fs.readFileSync(pathInfo.url);

                if (pathInfo.redirect) {
                    if (cookieData?.email) {
                        response.writeHead(301, { "Location": `/index${extenstion}` });
                        response.end();
                    }
                    else {
                        response.writeHead(301, { "Location": `/login/login${extenstion}` });
                        response.end();
                    }
                }
                else {
                    response.writeHead(200, { "Content-Type": "text/html; text/javascript; image/x-icon; charset=utf-8;" });
                    response.write(resFile); // body
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
                let body = '';

                request.on('data', function (chunk) {
                    body += chunk;

                    const sqlQuery = "SELECT email FROM usertbl WHERE email=?";
                    const param = JSON.parse(body);

                    myDB.post(sqlQuery, [param.email], (error, payload) => {
                        if (payload.length > 0) {
                            response.write(JSON.stringify(payload));
                            response.end();
                        }
                        else {
                            const sqlQueryInsert = "INSERT INTO usertbl SET ?";

                            console.log("신규 등록");

                            myDB.post(sqlQueryInsert, param, (error, payload) => {
                                response.writeHead(200, {
                                    "Content-Type": "text/html; text/javascript; application/json; charset=utf-8",
                                    "Set-Cookie": [`email=${encodeURIComponent(param.email)}; Path=/;`, `nickname=${encodeURIComponent(param.nickName)}; Path=/;`]
                                });
                                response.write(payload);
                                response.end();
                            });
                        }
                    });
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