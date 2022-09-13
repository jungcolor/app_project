module.exports = {
    init: function (request) {
        this.request = request;
    },

    getCookie: function (cName) {
        const list = {};
        const cookieHeader = this.request.headers?.cookie;
        if (!cookieHeader) return list;
        const cookies = cookieHeader.split(';');

        for (let i = 0, len = cookies.length; i < len; i++) {
            let [name, ...rest] = cookies[i].split("=");

            name = name?.trim();
            if (!name) return;

            const value = rest.join('=').trim();
            if (!value) return;

            if (cName === name) {
                list[name] = decodeURIComponent(value);
                break;
            }

            list[name] = decodeURIComponent(value);
        }

        return list;
    }
}