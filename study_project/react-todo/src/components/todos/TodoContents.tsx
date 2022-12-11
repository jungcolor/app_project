import React, { useEffect, useState } from 'react';
import ITodo from './Todo.interface';
import TodoAppend from './TodoAppend';
import TodoList from './TodoList';

const TodoContents = () => {
    const [todos, setTodos] = useState<any>([]);
    const getTodo = (id: string): ITodo[] => {
        return todos.filter((todo: ITodo) => todo.id !== id);
    }

    const addTodos = (value: string): void => {
        const result = { id: `todo-${crypto.randomUUID()}`, contents: value, checked: false, complete: false };

        setTodos(todos.concat(result));
    }

    const removeTodos = (id: string): void => {
        const result = getTodo(id);

        setTodos(result);
    };

    return (
        <div className="todo-contents">
            <TodoAppend addTodos={addTodos}></TodoAppend>
            <TodoList removeTodos={removeTodos}>{todos}</TodoList>
        </div>
    );
};

export default TodoContents;