require('dotenv').config();
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/', todoRoutes);

// Test DB connection
const db = require('./db');

db.query('SELECT NOW()')
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err.message);
  });
