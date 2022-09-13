const https = require('https');
const fs = require('fs');
const path = require('path');
const defaultPort = 3030;

module.exports = {
    init: function (callback, port) {
        if (!callback) throw new Error('callback is Undefined');

        this.callback = callback;
        this.port = port || defaultPort;
    },

    createServer: function () {
        https.createServer(this.getSSLOptions(), this.callback)
            .listen(this.port, () => {
                console.log(`[Server] listening on port ${this.port}`);
            });
    },

    getSSLOptions: function () {
        return {
            key: fs.readFileSync(path.resolve("./server/ssl/private.pem")),
            cert: fs.readFileSync(path.resolve("./server/ssl/public.pem"))
        }
    }
}