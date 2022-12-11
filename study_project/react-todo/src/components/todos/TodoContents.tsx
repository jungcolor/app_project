import React, { useEffect, useState } from 'react';
import ITodo from './Todo.interface';
import TodoAppend from './TodoAppend';
import TodoList from './TodoList';

const TodoContents = () => {
    const [todos, setTodos] = useState<any>([]);
    const fetchData = () => {
        const response = localStorage.getItem("todos");
        if (response) {
            const initTodos = JSON.parse(response);
            setTodos(initTodos);
        }
    };
    const addTodos = (value: string): void => {
        const newTodos = { id: `todo-${crypto.randomUUID()}`, contents: value, complete: false };
        const resultTodos = [newTodos, ...todos];
        setLocalStorage(resultTodos);
        setTodos(resultTodos);
    };
    const removeTodos = (id: string): void => {
        const newTodos = todos.filter((todo: ITodo) => todo.id !== id);
        setLocalStorage(newTodos);
        setTodos(newTodos);
    };
    const completeTodos = (id: string, value: boolean) => {
        const newTodos = todos.filter((todo: ITodo) => todo.id !== id);
        const updateTodo = todos.filter((todo: ITodo) => todo.id === id);

        if (updateTodo.length > 0) {
            let resultTodos = [...updateTodo, ...newTodos];
            updateTodo[0].complete = value;
    
            if (value) {
                resultTodos = [...newTodos, ...updateTodo];
            }
            setLocalStorage(resultTodos);
            setTodos(resultTodos);
        }
    };
    const setLocalStorage = (todos: ITodo[]) => {
        localStorage.setItem("todos", JSON.stringify(todos));
    };

    // 로컬스토리지에 있는 초기값 설정
    useEffect(() => {
        fetchData();
    }, []);

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