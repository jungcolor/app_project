import React, { useRef, useState } from 'react';
import { AiOutlinePlus } from "react-icons/ai";

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
        addTodos(value);
        reset();
    };
    const keyupEnterHandler = (e: React.KeyboardEvent<HTMLInputElement>): void => {
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
            <input type="text" value={value} onChange={changeValueHandler} onKeyUp={keyupEnterHandler} ref={inputRef} placeholder="할 일을 입력하세요" />
            <span onClick={clickAddHandler}><AiOutlinePlus /></span>
        </div>
    );
};

export default TodoAppend;