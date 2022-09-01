// npm 모듈
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 5000;

// 로컬 모듈
const db = require("./config/db");
const server = require("./config/server");

// DB 셋팅
db.init();

// 서버 초기 셋팅
server.init(express(), port);
// 미들웨어 설정
server.setMiddleWare(bodyParser.urlencoded({ extended: true }));
server.setMiddleWare(bodyParser.json());
server.setMiddleWare(cors({ origin: true }));
// 서버 연결
server.connect();

server.get("/api/todo", (req, res) => {
    const sql = `SELECT * FROM todotable`;

    db.query(sql, payload => {
        if (payload.success) {
            payload.datas.forEach(row => {
                if (row.complete === 0) {
                    row.complete = false;
                }
                else {
                    row.complete = true;
                }
            });
        }

        res.send(payload);
    });
});

server.post("/api/todo/add", (req, res) => {
    let { id, content, complete } = req.body;
    complete = complete ? 1 : 0;

    const sql = `INSERT INTO todotable(id, content, complete) VALUES('${id}', '${content}', '${complete}')`;

    db.query(sql, payload => {
        res.send(payload);
    });
});