const mysql = require('mysql');
const dbInfo = {
    host: 'localhost',
    user: 'root',
    password: '1q2w3e4r',
    database: 'my_db'
};

module.exports = {
    init: function () {
        this.db = mysql.createConnection(dbInfo);
    },

    connect: function () {
        this.db.connect((err) => {
            if (err) throw new Error(`MySQL connection error ${err}`);
            console.log('MySQL is connection successfully!');
        });
    },

    get: function (queryStr, callback) {
        this.db.query(queryStr, (err, payload) => {
            if (err) {
                callback({ err, payload });
            }
            else {
                callback({ payload });
            }
        });
    },

    post: function (queryStr, param, callback) {
        this.db.query(queryStr, param, (err, payload) => {
            if (err) {
                callback({ err, payload });
            }
            else {
                callback({ payload });
            }
        });
    },
}