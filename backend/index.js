const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let notes = [
  { id: 1, text: "First note" },
];

app.get('/notes', (req, res) => {
  res.json(notes);
});

app.post('/notes', (req, res) => {
  const { text } = req.body;
  const newNote = { id: notes.length + 1, text };
  notes.push(newNote);
  res.status(201).json(newNote);
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
