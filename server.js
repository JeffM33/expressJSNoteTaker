const express = require('express');
const path = require('path');
const fs = require('fs');
const {
  readFromFile,
  writeToFile,
} = require('./helpers/fsUtils');


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
  //readFromFile('/db/db.json').then((data) => res.json(JSON.parse(data)));
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

// Deleting a specific note
app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;
  // console.log(noteId, 'logging note id after req.params');
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all db except the one with the ID provided in the URL
      // console.log(noteId, 'logging note id after the .then statements');
      const result = json.filter((notes) => notes.id !== noteId);
      // console.log(notes, 'Logging notes after result');
      // console.log(result, 'logging result after filtering json');
      // Save that array to the filesystem
      writeToFile('./db/db.json', result);
      
      // Respond to the DELETE request
      res.json(`Item ${noteId} has been deleted 🗑️`);
      // console.log(noteId, 'logging note id once the delete request has been declared.');
    });
});

// Need to use in order to hook into our website. otherwise it wont load.
app.listen(PORT, () =>{
  console.log(`Example app listening at http://localhost:${PORT}`);
});
