import React, { useState, useEffect } from 'react';
import {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  summarizeTodos,
} from './api';  // make sure your api functions use `id` as well
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const res = await getTodos();
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = async () => {
    if (!newTodo.trim()) return;
    await addTodo(newTodo);
    setNewTodo('');
    loadTodos();
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    loadTodos();
  };

  const handleEdit = (id) => {
    setEditId(id);
    const todo = todos.find((t) => t.id === id); // use id here
    setEditText(todo.todo);
  };

  const handleUpdate = async (id) => {
    if (!editText.trim()) return;
    await updateTodo(id, editText);
    setEditId(null);
    setEditText('');
    loadTodos();
  };

  const handleSummarize = async () => {
    try {
      await summarizeTodos();
      setMessage('✅ Summary sent to Slack successfully!');
    } catch (err) {
      setMessage('❌ Failed to send summary to Slack.');
    }

    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="app">
      <h1>📝 Todo Summary Assistant</h1>

      <div className="input-group">
        <input
          value={newTodo}
          placeholder="Add a new todo..."
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">  {/* use id as key */}
            {editId === todo.id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => handleUpdate(todo.id)}>Save</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>{todo.todo}</span>
                <div>
                  <button onClick={() => handleEdit(todo.id)}>Edit</button>
                  <button onClick={() => handleDelete(todo.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      <button className="summarize-btn" onClick={handleSummarize}>
        Summarize & Send to Slack
      </button>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default App;
