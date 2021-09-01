const express = require('express');
const path = require('path');

const PORT = process.env.port || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
)

// Getting notes page from assets.  
app.get('/notes', (req, res) => 
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//Setting 404 error
app.get('*', (req, res) => 
  res.sendFile(path.join(__dirname, 'public/404.html'))
);

// Need to use in order to hook into our website. otherwise it wont load.
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
