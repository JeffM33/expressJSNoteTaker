const express = require('express');
const path = require('path');
const notes = require('./db/db.json');

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
app.get('*', (req, res) =>{
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// app.get('/api/notes', (req, res) => {
//   res.sendFile(path.join(__dirname, '/db/db.json'));

//   req.method(notes);
// });


// Need to use in order to hook into our website. otherwise it wont load.
app.listen(PORT, () =>{
  console.log(`Example app listening at http://localhost:${PORT}`);
});
