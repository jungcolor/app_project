import React, { useEffect, useState } from 'react';
import ITodo from './Todo.interface';
import TodoAppend from './TodoAppend';
import TodoList from './TodoList';

const TodoContents = () => {
    const [todos, setTodos] = useState<any>([]);
    const addTodos = (value: string): void => {
        const result = { id: `todo-${crypto.randomUUID()}`, contents: value, complete: false };
        setTodos(todos.concat(result));
    };
    const removeTodos = (id: string): void => {
        const newTodos = todos.filter((todo: ITodo) => todo.id !== id);
        setTodos(newTodos);
    };
    const completeTodos = (id: string, value: boolean) => {
        const newTodos = todos.filter((todo: ITodo) => todo.id !== id);
        const updateTodo = todos.filter((todo: ITodo) => todo.id === id);

        if (updateTodo.length > 0) {
            updateTodo[0].complete = value;
    
            if (value) {
                setTodos([...newTodos, ...updateTodo]);
            }
            else {
                setTodos([...updateTodo, ...newTodos]);
            }
        }
    };

    return (
        <div className="todo-contents">
            <TodoAppend addTodos={addTodos}></TodoAppend>
            <TodoList removeTodos={removeTodos} completeTodos={completeTodos}>
                {todos}
            </TodoList>
        </div>
    );
};

export default TodoContents;