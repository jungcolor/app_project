module.exports = {
    server: null,
    port: 4000,

    init: function (server, port) {
        this.server = server;
        this.port = port || this.port;
    },

    connect: function () {
        this.server.listen(this.port, () => {
            console.log(`[Server] listening on port ${this.port}`);
        });
    },

    setMiddleWare: function (middleWare) {
        this.server.use(middleWare);
    },

    api: function (method, url, callback) {
        this.server[method](url, callback);
    },
}