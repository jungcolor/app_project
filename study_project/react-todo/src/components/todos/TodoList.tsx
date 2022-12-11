import React from 'react';
import ITodo from './Todo.interface';
import TodoItem from './TodoItem';

interface ITodoList {
    children: ITodo[];
    removeTodos: (id: string) => void;
    completeTodos: (id: string, value: boolean) => void;
}

const TodoList = ({ children, removeTodos, completeTodos }: ITodoList) => {
    return (
        <div className="todo-list">
            <ul>
                {children?.map((item: ITodo) => {
                    const { id, contents, complete } = item;

                    return <TodoItem key={id} id={id} contents={contents} complete={complete} removeTodos={removeTodos} completeTodos={completeTodos} />;
                })}
            </ul>
        </div>
    );
};

export default TodoList;