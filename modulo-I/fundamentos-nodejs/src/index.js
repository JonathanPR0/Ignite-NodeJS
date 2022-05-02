const express = require('express');
const app = express();

app.get('/courses', (req, res) => {
  return res.json(['Curso 1', 'Curso 2', 'Curso 3', 'Curso 4']);
});

app.post('/courses', (req, res) => {
  return res.json(['Curso 1', 'Curso 2', 'Curso 3', 'Curso 4', 'Curso 5']);
});

app.put('/courses/:id', (req, res) => {
  return res.json(['Curso 2', 'Curso 3', 'Curso 4', 'Curso 5', 'Curso 6']);
});

app.patch('/courses/:id', (req, res) => {
  return res.json(['Curso 0', 'Curso 2', 'Curso 3', 'Curso 4', 'Curso 5']);
});

app.delete('/courses/:id', (req, res) => {
  return res.json(['Curso 2', 'Curso 3', 'Curso 4', 'Curso 5']);
});

app.listen(3000);
