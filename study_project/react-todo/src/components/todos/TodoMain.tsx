import React from 'react';
import TodoContents from './TodoContents';
import TodoHeader from './TodoHeader';

const TodoMain = () => {
    return (
        <div className="wrapper-todo">
            <TodoHeader />
            <TodoContents />
        </div>
    );
};

export default TodoMain;