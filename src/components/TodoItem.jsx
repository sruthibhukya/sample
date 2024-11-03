import React, { useState } from 'react';
import { useTodo } from '../Contexts/TodoContext';

const TodoItem = ({ todo }) => {
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [todoMsg, setTodoMsg] = useState(todo.todo);
    const { updateTodo, deleteTodo, toggleComplete } = useTodo();

    const editTodo = () => {
        updateTodo(todo.id, { ...todo, todo: todoMsg });
        setIsTodoEditable(false);
    };

    const toggleCompleted = () => {
        toggleComplete(todo.id);
    };

    return (
        <div
            className={`flex items-center border border-gray-200 rounded-lg px-4 py-2 gap-x-3 
                        shadow-sm duration-300 text-gray-800 transition-all ${
                todo.completed ? "bg-green-100" : "bg-purple-100"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer accent-blue-500"
                checked={todo.completed}
                onChange={toggleCompleted}
            />
            <input
                type="text"
                className={`border w-full bg-transparent rounded-lg px-2 py-1 text-gray-700 
                            outline-none transition-all ${isTodoEditable ? "border-gray-300" : "border-transparent"} 
                            ${todo.completed ? "line-through text-gray-500" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            <button
                className="flex justify-center items-center w-8 h-8 rounded-lg text-gray-600 
                           border border-gray-300 bg-gray-50 hover:bg-gray-100 
                           disabled:opacity-50 transition-colors"
                onClick={() => {
                    if (todo.completed) return;
                    if (isTodoEditable) {
                        editTodo();
                    } else {
                        setIsTodoEditable((prev) => !prev);
                    }
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? "📁" : "✏️"}
            </button>
            <button
                className="flex justify-center items-center w-8 h-8 rounded-lg text-gray-600 
                           border border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors"
                onClick={() => deleteTodo(todo.id)}
            >
                ❌
            </button>
        </div>
    );
};

export default TodoItem;
