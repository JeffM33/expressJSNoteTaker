const express = require('express');
const path = require('path');
const fs = require('fs');

const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
const app = express();
const PORT = process.env.port || 3001;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Getting notes page from assets.  
app.get('/notes', (req, res) =>{ 
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// getting index.html
app.get('/', (req, res) =>{
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Gets all notes
app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/db/db.json'));
});

// Getting notes by id
app.get('/api/notes/:id', (req, res) => {
  res.json(notes[Number(req.params.id)]);
});

// Creating the notes
app.post('/api/notes', (req, res) => {
  let note = req.body;
  let id = (notes.length).toString();

  note.id = id;
  notes.push(note);

  console.log(id);
  console.log(note);

  fs.writeFileSync('./db/db.json', JSON.stringify(notes));
  res.json(notes);
});

// Need to use in order to hook into our website. otherwise it wont load.
app.listen(PORT, () =>{
  console.log(`Example app listening at http://localhost:${PORT}`);
});
