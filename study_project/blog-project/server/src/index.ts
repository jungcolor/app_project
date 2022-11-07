import Board from "./models/Board";
import dbKey from "./config/dev";

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const app = express();
const port = 5000;

mongoose
    .connect(dbKey())
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));

// application/x-www.form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// apllication/json
app.use(bodyParser.json());
app.use(cookieParser());


// BOARD ==============================================================================================================================
app.get("/api/board/list", (req, res) => {
    Board.find((err, list) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true, list });
    }).sort({ writeDate: -1 });
});

app.post("/api/board/detail", (req, res) => {
    Board.find({ _id: req.body }, (err, detailData) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true, detailData });
    });
});

app.post("/api/board/write", (req, res) => {
    // 작성한 글 정보를 client에서 가져오면
    // 가져온 데이터들을 데이터 베이스에 넣어준다.
    const board = new Board(req.body);
    board.save((err, data) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true });
    });
});

app.post("/api/board/update", (req, res) => {
    Board.findByIdAndUpdate(
        { _id: req.body.id }, // target ID
        {
            $set: {
                title: req.body.title,
                writer: req.body.writer,
                contents: req.body.contents,
                writerDate: req.body.writerDate,
            },
        }, // 변경 될 값
        (err, updateData) => {
            // callback
            if (err) return res.json({ success: false, err });
            return res.status(200).json({ success: true, updateData });
        }
    );
});

app.post("/api/board/search", (req, res) => {
    Board.find({ title: { $regex: req.body.contents } }, (err, searchData) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true, searchData: searchData });
    }).sort({ writeDate: -1 });
});

app.post("/api/board/remove", (req, res) => {
    Board.deleteMany({ _id: req.body }, (err, removeData) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true });
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
