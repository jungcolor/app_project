import React from 'react';
import ITodo from './Todo.interface';
import TodoItem from './TodoItem';

interface ITodoList {
    children: ITodo[];
    removeTodos: (id: string) => void;
}

const TodoList = ({ children, removeTodos }: ITodoList) => {
    return (
        <div className="todo-list">
            <ul>
                {children?.map((item: ITodo) => {
                    const { id, contents, checked, complete } = item;

                    return <TodoItem key={id} id={id} contents={contents} checked={checked} complete={complete} removeTodos={removeTodos} />;
                })}
            </ul>
        </div>
    );
};

export default TodoList;