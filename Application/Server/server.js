const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
const { initDb } = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Notes API running');
});

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

// Start after DB is ready
(async () => {
  try {
    await initDb();

    app.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server due to DB error');
    process.exit(1);
  }
})();
