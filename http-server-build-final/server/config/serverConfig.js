const http = require('http');
const defaultPort = 3030;

module.exports = {
    init: function (callback, port) {
        if (!callback) throw new Error('callback is Undefined');

        this.callback = callback;
        this.port = port || defaultPort;
    },

    createServer: function () {
        http.createServer(this.callback)
            .listen(this.port, () => {
                console.log(`[Server] listening on port ${this.port}`);
            });
    }
}