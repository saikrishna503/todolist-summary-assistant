import axios from 'axios';

const BASE_URL = 'http://localhost:4000'; // Update if deployed

export const getTodos = () => axios.get(`${BASE_URL}/todos`);
export const addTodo = (todo) => axios.post(`${BASE_URL}/todos`, { todo });
export const deleteTodo = (id) => axios.delete(`${BASE_URL}/todos/${id}`);
export const updateTodo = (id, updatedText) =>
  axios.put(`${BASE_URL}/todos/${id}`, { todo: updatedText });
export const summarizeTodos = () => axios.post(`${BASE_URL}/todos/summarize`);

