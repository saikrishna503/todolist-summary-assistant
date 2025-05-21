const { OpenAI } = require('openai');
const axios = require('axios');
const express = require('express');
const router = express.Router();
const db = require('../db');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
// GET /todos - Fetch all todos
router.get('/todos', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM todos ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// POST /todos - Add new todo
router.post('/todos', async (req, res) => {
  const { todo } = req.body;
  if (!todo) return res.status(400).json({ error: 'Todo cannot be empty' });

  try {
    const result = await db.query(
      'INSERT INTO todos (todo) VALUES ($1) RETURNING *',
      [todo]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// PUT /todos/:id - Update todo  <-- Added this route
router.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { todo } = req.body;
  if (!todo) return res.status(400).json({ error: 'Todo cannot be empty' });

  try {
    const result = await db.query(
      'UPDATE todos SET todo = $1 WHERE id = $2 RETURNING *',
      [todo, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// DELETE /todos/:id - Delete todo
router.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM todos WHERE id = $1', [id]);
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

// POST /summarize - Summarize todos and send to Slack
router.post('/todos/summarize', async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM todos  ORDER BY id");
    const todos = result.rows;

    if (todos.length === 0) {
      return res.status(400).json({ error: 'No pending todos to summarize' });
    }

    const todoText = todos.map((t, i) => `${i + 1}. ${t.todo}`).join('\n');
    const prompt = `Please summarize these pending to-dos:\n${todoText}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const summary = completion.choices[0].message.content;

    await axios.post(process.env.SLACK_WEBHOOK_URL, {
      text: `📝 *Pending Todo Summary:*\n${summary}`,
    });

    res.json({ message: 'Pending todos summarized and sent to Slack successfully' });
  } catch (err) {
     console.error('Error during summarization:', err.response?.data || err.message || err);
    res.status(500).json({ error: 'Failed to summarize pending todos and send to Slack' });
  }
});

module.exports = router;