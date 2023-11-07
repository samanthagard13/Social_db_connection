const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/socials_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

app.get('/test', (req, res) => {
  res.send("Testing....");
})

app.get('/data', async (req, res) => {
  try {
    res.json({ message: 'Data from the database' });
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use('/', routes); // we are passing the incoming request

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
