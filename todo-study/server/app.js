// npm 모듈
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;

// 로컬 모듈
const db = require("./config/db");

// 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    console.log("Hello World");
});

app.listen(port, () => { console.log(`[Server] listening on port ${port}`) });

db.init();
db.connect();