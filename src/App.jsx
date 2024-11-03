import React, { useState, useEffect } from 'react';
import { TodoProvider } from './Contexts/TodoContext';
import { TodoForm, TodoItem } from './components';

const App = () => {
    const [todos, setTodos] = useState([]);

    const addTodo = (todo) => {
        setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
    };

    const updateTodo = (id, updatedTodo) => {
        setTodos((prev) =>
            prev.map((todo) => (todo.id === id ? updatedTodo : todo))
        );
    };

    const deleteTodo = (id) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    const toggleComplete = (id) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem("todos"));
        if (storedTodos && storedTodos.length > 0) {
            setTodos(storedTodos);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    return (
        <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
            <TodoForm />
            {todos.map((todo) => (
                <div key={todo.id}>
                    <TodoItem todo={todo} />
                </div>
            ))}
        </TodoProvider>
    );
};

export default App;
