const fs = require('fs');
const zlib = require('zlib');

const { createServer } = require('http');

const PORT = 3000;

const server = createServer((req, res) => {
  console.log('Server request');
  console.log(req.url, req.method);

  // res.setHeader('Content-Type', 'text/html');
  // res.write('<head><link rel="stylesheet" href="#"></head>');
  // res.write('<h1>Hello world</h1>');

  res.setHeader('Content-Type', 'app;ication/json');

  const data = JSON.stringify([
    { name: 'benny', age: 35 },
    { name: 'alla', age: 32 },
  ]);

  res.end(data);
});

server.listen(PORT, 'localhost', (error) => {
  error ? console.log(error) : console.log(`Listening port ${PORT}`);
});
