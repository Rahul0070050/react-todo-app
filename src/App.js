import React, { useState, useEffect } from 'react'
import './App.css';
import Todos from './Todos';
import { v4 as uuidv4 } from 'uuid'

const KEY = '123';

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');
  const handleSubmit = () => {
    if (!todo) return;
    setTodos(oldTodos => {
      let allTodos = [...oldTodos, { todo, id: uuidv4(), completed: false }];
      setDatalocaly(allTodos)
      return allTodos;
    })
    setTodo('')
  }


  useEffect(() => {
    let localTodos = localStorage.getItem(KEY)
    if (localTodos) {
      setTodos(JSON.parse(localTodos))
    }
  }, []);


  const setDatalocaly = (data) => {
    localStorage.setItem(KEY, JSON.stringify(data))
  }

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed }
        }
        return todo
      })
    )
  }
  const deleteTodo = (id) => {
    setTodos(allTodo => {
      let editedTodo = allTodo.filter(todo => todo.id !== id);
      setDatalocaly(editedTodo);
      return editedTodo;
    })
  }

  const clearFinishedTodos = () => {
    setTodos((allTodos => {
      let updatedTodos = allTodos.filter(todo => todo.completed !== true)
      setDatalocaly(updatedTodos);
      return updatedTodos;
    }))
  }
  const clearAll = () => {
    setDatalocaly([]);
    setTodos([])
  }
  return (
    <section className="section row">
      <main className="col-11 col-md-7 col-lg-5">
        <header>
          <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
          <button onClick={handleSubmit}>add</button>
        </header>
        {todos.length > 0 && (
          <>
            <div className="right">
              <button onClick={clearFinishedTodos} className="clear-btn">clear</button>
            </div>
            <div className="todos">
              <ul>
                {todos.map(todos => {
                  return <Todos key={todos.todo} {...todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
                })}
              </ul>
            </div>
            <div className="center">
              <button className="all-clear" onClick={clearAll}>clear all</button>
            </div>
          </>
        )}
      </main>
    </section >
  )
}

export default App;
