// ---------------------------------------------
// server
// ---------------------------------------------
const { createServer, Socket, Server } = require('net');
const path = require('path');
const fs = require('fs'); // 파일 읽기 / 쓰기
const port = 3030;

const server = createServer((clientSocket) => { // 2
    // console.log(`[server] connected client: ${JSON.stringify(clientSocket.address())}`);
    // console.log(clientSocket.address());

    clientSocket.on('data', (request) => { // 4
        console.log('request >>>>>>>>>> ', JSON.parse(request));
        console.log("request path >>>>>>>>", JSON.parse(request).url);
        const url = JSON.parse(request).url;

        if (url === "/index") {
            fs.readFile('../index.html', 'utf8', (error, data) => {
                // console.log("data >>>>>>>>> ", data);

                if (error) {}
                else {
                    clientSocket.write(data); // 5
                }

                // const response = [
                //     'HTTP/1.1 200 OK',
                //     'Content-Type: text/html',
                //     'Status: 200',
                //     '',
                //     '',
                //     data,
                //     '',
                //     '',
                // ].join('\r\n');
            });
        }
    });
});

server.listen(port, () => {
    console.log(`[server] listen >>>>>>`);
    // console.log(`[server] opend server: ${JSON.stringify(server.address())}`);
});

// ---------------------------------------------
// client
// ---------------------------------------------
const client = new Socket();
const clientOptions = {
    port,
    host: 'localhost'
}

client.connect(clientOptions, () => { // 1
    console.log(`[client] connected`);

    console.log(arguments);

    const request = { url: '/index' };
    client.write(JSON.stringify(request)); // 3
});

client.on('data', serverData => {
    console.log(`[client] data >>>>>>`);
    console.log(serverData.toString().split('\r\n'));
    client.destroy();
});

client.on('end', () => {
    console.log(`[client] connection end`);
});

client.on('error', (err) => {
    console.log(`[client] error : `, err);
});

client.on('close', () => {
    console.log(`[client] connection closed`);
});