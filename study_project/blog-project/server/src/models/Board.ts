import * as mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
    id: {
        type: String
    },
    title: {
        type: String,
        minlength: 1,
    },
    contents: {
        type: String,
        minlength: 1,
    },
    writeDate: {
        type: String,
    },
});

const Board = mongoose.model("Board", boardSchema);

export default Board;
