// npm 모듈
const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;

// 정적파일 경로 설정 - css, js, img 등등
app.use(express.static(__dirname + "/src"));

// cors 설정
app.use(cors({ origin: true }));

app.get("/", (req, res) => {
    res.status(200).sendFile(__dirname + "/index.html");
});

app.listen(port, () => { console.log(`[Client] listening on port ${port}`) });