const mysql = require("mysql");
const dbInfo = {
    host: "localhost",
    user: "root",
    password: "1q2w3e4r",
    database: "todo"
};

module.exports = {
    init: function () {
        this.db = mysql.createConnection(dbInfo);
    },

    connect: function () {
        this.db.connect(error => {
            if (error) throw new Error(`MySQL connection error ${error}`);
            console.log('MySQL is connection successfully!');
        });
    },
}