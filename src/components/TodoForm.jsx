import React, { useState } from 'react';
import { useTodo } from "../Contexts/TodoContext.js";

function TodoForm() {
    const [todo, setTodo] = useState("");
    const { addTodo } = useTodo();

    const add = (e) => {
        e.preventDefault();
        if (!todo) return;
        addTodo({ todo, completed: false });
        setTodo("");
    };

    return (
        <form onSubmit={add} className="flex items-center mb-4">
            <input
                type="text"
                placeholder="Write your task here..."
                className="w-full border border-gray-300 rounded-l-lg px-4 py-2 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           text-gray-700 placeholder-gray-400 shadow-sm transition"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button
                type="submit"
                className="bg-green-600 hover:bg-blue-700 text-white font-semibold 
                           rounded-r-lg px-5 py-2 shadow-md transition transform 
                           active:scale-95"
            >
                Add
            </button>
        </form>
    );
}

export default TodoForm;
