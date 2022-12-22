import React, { useState, useEffect, useRef } from "react";
import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addPost } from "../../features/post/postSlice";
import { useNavigate } from "react-router-dom";

const PostWrite = () => {
    const [title, setTitle] = useState("");
    const [editor, setEditor] = useState<any>();
    const editorRef = useRef<any>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const onClickSave = () => {
        const result = { title, contents: editor.getHTML() };

        dispatch(addPost(result));
        navigate("/");
    };

    useEffect(() => {
        const editorObj = new Editor({
            el: editorRef.current,
            height: "500px",
            previewStyle: "vertical",
            initialValue: " ",
        });

        setEditor(editorObj);
    }, []);

    return (
        <>
            <h2>목록 작성</h2>
            <div style={{ display: "flex", margin: "15px 0" }}>
                <h3>제목</h3>
                <input type="text" value={title} onChange={onChangeHandler} />
            </div>
            <div>
                <h3>내용</h3>
                <div ref={editorRef}></div>
            </div>
            <button style={{ marginTop: "10px" }} onClick={onClickSave}>
                저장
            </button>
        </>
    );
};

export default PostWrite;
