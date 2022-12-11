import React from 'react';
import ITodo from './Todo.interface';
import { AiOutlineMinusCircle } from "react-icons/ai";

interface ITodoItem extends ITodo {
    removeTodos: (id: string) => void;
    completeTodos: (id: string, value: boolean) => void;
}

const getConvertStr = (id: string) => {
    const strArr = id.split("-");    
    return strArr[strArr.length - 1];
}

const TodoItem = ({ id, contents, complete, removeTodos, completeTodos }: ITodoItem) => {
    const convertStr = getConvertStr(id);
    const clickRemoveHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
        removeTodos(id);
    };
    const changeValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        completeTodos(id, checked);
    }

    return (
        <li id={id} className={complete ? "complete" : ""}>
            <input type="checkbox" name={convertStr} id={convertStr} defaultChecked={complete ? complete : false} onChange={changeValueHandler} />
            <label htmlFor={convertStr}>{contents}</label>
            <span onClick={clickRemoveHandler}>
                <AiOutlineMinusCircle />
            </span>
        </li>
    );
};

export default TodoItem;