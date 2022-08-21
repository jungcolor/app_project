// 모듈 가져오는 부분 분리
const dbconfig = require('./config/dbConfig'); // db
const serverConfig = require('./config/serverConfig'); // http 모듈

// 상수
const PORT = 3040;

// DB 모듈
const connection = dbconfig.getConnection;

function apiServer(request, response) {
    try {
        // TODO 파일, url관련 로직 파일 분리
        const { method, url } = request;
        console.log(`[Server] request method ${method}`);
        console.log(`[Server] request url ${url}`);

        if (method === "POST") {
            if (url == "/api/login") {
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
                });
            }
            else if (url == "/api/menu") {
                console.log("api server menu");
            }
        }
        else if (method === "OPTIONS") {
            response.writeHead(200);
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

serverConfig(apiServer, PORT);