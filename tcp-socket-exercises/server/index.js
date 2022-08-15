// ---------------------------------------------
// server
// ---------------------------------------------
const { createServer, Socket } = require('net');
const path = require('path');
const fs = require('fs');
const port = 3030;

const server = createServer((clientSocket) => { // 2
    clientSocket.on('data', (data) => { // 4
         // buffer 데이터 > string 데이터로 변경
        const requestMessage = data.toString();
        // 요청온 데이터 중 첫번 째 줄(메소드, URI, 버전) 따로 변수에 저장
        const [first] = requestMessage.split('\r\n'); 
        // 각각의 변수명으로 저장
        let [method, resource, version] = first.split(' ');

        // 만약 URI가 "/"값이면 index.html 넣어줌
        if (resource[resource.length - 1] === "/") {
            resource += 'index';
        }

        const file = resource.split("/");
        const fileName = file.pop();
        console.log("파일명 >>>>>>> ", fileName);

        const filePath = file.join("/");
        console.log("폴더명 >>>>>>>", filePath);

        const fullPath = path.join(process.cwd(), filePath);

        try {
            if (fileName === "index") { // index 페이지
                const content = fs.readFileSync(path.join(fullPath, 'index.html')); // 동기
    
                clientSocket.write(Buffer.from(`HTTP/1.1 200 OK\r\n`));
                clientSocket.write(Buffer.from(`Content-Type: text/html\r\n`));
                clientSocket.write(Buffer.from(`Content-Length: ${content.length}\r\n`));
                clientSocket.write(Buffer.from(`\r\n`));
                clientSocket.write(content);
                clientSocket.write(Buffer.from(`\r\n`));
                clientSocket.end();
            }
            else if (fileName === "what_to_eat") { // what_to_eat 페이지
                const content = fs.readFileSync(path.join(fullPath, 'what_to_eat.html')); // 동기
    
                clientSocket.write(Buffer.from(`HTTP/1.1 200 OK\r\n`));
                clientSocket.write(Buffer.from(`Content-Type: text/html; text/javascript;\r\n`));
                clientSocket.write(Buffer.from(`\r\n`));
                clientSocket.write(content);
                clientSocket.write(Buffer.from(`\r\n`));
                clientSocket.end();
            }
            else if (fileName === "randomMenu") {
                const content = require(path.join(fullPath, 'randomMenu.js')).getmenu();
    
                clientSocket.write(Buffer.from(`HTTP/1.1 200 OK\r\n`));
                clientSocket.write(Buffer.from(`Content-Type: text/plain;\r\n`));
                clientSocket.write(Buffer.from(`\r\n`));
                clientSocket.write(content);
                clientSocket.write(Buffer.from(`\r\n`));
                clientSocket.end();
            }
            else if (fileName === "error500") {
                require(path.join(process.cwd(), '/server/', 'error.js')).geterror();
            }
            else {
                // 404 error
                const content = `
                    <!doctype html>
                    <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <<meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <meta http-equiv="X-UA-Compatible" content="ie=edge">
                            <title>Document</title>
                        </head>
                        <body>
                            <h1>404 Error</h1>
                        </body>
                    </html>
                `;
    
                clientSocket.write(Buffer.from(`HTTP/1.1 404 ${resource} is not found\r\n`));
                clientSocket.write(Buffer.from(`Content-Type: text/html\r\n`));
                clientSocket.write(Buffer.from(`Content-Length: ${content.length}\r\n`));
                clientSocket.write(Buffer.from(`\r\n`));
                clientSocket.write(content);
                clientSocket.write(Buffer.from(`\r\n`));
                clientSocket.end();
            }
        }
        catch (error) {
            console.log(error);
            const content = `
                <!doctype html>
                <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <<meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <meta http-equiv="X-UA-Compatible" content="ie=edge">
                        <title>Document</title>
                    </head>
                    <body>
                        <h1>${error}</h1>
                    </body>
                </html>
            `;

            clientSocket.write(Buffer.from(`HTTP/1.1 500 Internal Server error\r\n`));
            clientSocket.write(Buffer.from(`Content-Type: text/html\r\n`));
            clientSocket.write(Buffer.from(`Content-Length: ${content.length}\r\n`));
            clientSocket.write(Buffer.from(`\r\n`));
            clientSocket.write(content);
            clientSocket.write(Buffer.from(`\r\n`));
            clientSocket.end();
        }
    });
});

server.listen(port, () => {
    console.log(`Server Listen`);
});

// ---------------------------------------------
// client
// ---------------------------------------------
const client = new Socket();
client.connect(port, 'localhost', () => {});

client.on('data', serverData => {
    console.log(`[client] data >>>>>> `, serverData);
    client.destroy();
});