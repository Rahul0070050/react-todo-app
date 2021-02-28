import React from 'react';
import './App.css'

export default function Todos({ todo, id, completed, toggleTodo, deleteTodo }) {
    return (
        <li onClick={() => toggleTodo(id)} className={completed ? `finished` : null}>{todo}</li>
    );
}
