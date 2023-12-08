/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module

  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files

  2. GET /file/:filename - Returns content of given file by name
    Description: Use the filename from the request path parameter to read the file from `./files/` directory
    Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
    Example: GET http://localhost:3000/file/example.txt

    - For any other route not defined in the server return 404

    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.get('/files', (req, res) => {
  fs.readdir(path.join(__dirname, './files'), 'utf8', (err, files) => {
    if(err){
      return res.status(500).json({ error: 'Failed to retrieve files' });
    }
    res.json(files);
  });
});

app.get('/file/:filename', (req, res) => {
  fs.readFile(path.join(__dirname, './files', req.params.filename), 'utf8', (err, data) =>{
    if(err){
      return res.status(404).send('File not found');
    }
    res.json(data);
  });
});

app.use((req, res, next) => {
  res.status(404).send('Route not found');
});

// module.exports = app;

app.listen(3000);

// Purpose:
// Line 1 (fs.readFile) is used for reading the contents of a specific file.
// Line 2 (fs.readdir) is used for listing the contents of a directory.

// Callback Arguments:
// The callback function for fs.readFile receives an error (if any) and the content of the file.
// The callback function for fs.readdir receives an error (if any) and an array of file/directory names.

// Usage:
// Line 1 is suitable when you want to read and obtain the content of a specific file.
// Line 2 is suitable when you want to get a list of files/directories in a directory.