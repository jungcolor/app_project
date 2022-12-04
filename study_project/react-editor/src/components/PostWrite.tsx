import React, { useState, useEffect, useRef } from 'react';
import Editor from '@toast-ui/editor';
import "@toast-ui/editor/dist/toastui-editor.css";

export interface IData {
    title: string;
    contents: string;
}

interface IPostWrite {
    handleSave: (data: IData[]) => void;
}

const PostWrite = ({ handleSave }: IPostWrite) => {
    const [title, setTitle] = useState("");
    const [editor, setEditor] = useState<any>();
    const editorRef = useRef<any>(null);
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const onClickSave = (e: React.MouseEvent<HTMLButtonElement>) => {
        const result = [];
        result.push({
            title,
            contents: editor.getHTML(),
        });

        handleSave(result);
    };

    useEffect(() => {
        const editorObj = new Editor({
            el: editorRef.current,
            height: "500px",
            previewStyle: "vertical",
            initialValue: "## Hello Toast UI Editor",
        });

        setEditor(editorObj);
    }, []);

    return (
        <>
            <h2>글작성</h2>
            <div>
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