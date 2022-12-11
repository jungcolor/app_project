import React from 'react';
import TodoAppend from './TodoAppend';
import TodoList from './TodoList';

const TodoContents = () => {
    return (
        <div className="todo-contents">
            <TodoAppend />
            <TodoList />
        </div>
    );
};

export default TodoContents;