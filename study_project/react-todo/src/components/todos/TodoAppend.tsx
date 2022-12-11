import React, { useRef, useState } from 'react';

interface IProps {
    addTodos: (value: string) => void;
}

const TodoAppend = ({ addTodos }: IProps) => {
    const [value, setValue] = useState("");
    const inputRef = useRef<HTMLInputElement | any>(null);
    const changeValueHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = e.target;
        setValue(value);
    };
    const clickAddHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
        if (value === "") {
            alert("내용을 입력하세요!!");
            return;
        }
        addTodos(value);
        reset();
    };
    const keyupEnterHandler = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (value === "") {
            alert("내용을 입력하세요!!");
            return;
        }
        if (e.key === "Enter") {
            addTodos(value);
            reset();
        }
    };
    const reset = (): void => {
        setValue("");

        // focus 이동
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div className="todo-append">
            <input type="text" value={value} onChange={changeValueHandler} onKeyUp={keyupEnterHandler} ref={inputRef} />
            <button type="button" onClick={clickAddHandler}>+</button>
        </div>
    );
};

export default TodoAppend;