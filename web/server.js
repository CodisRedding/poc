const async = require('async');
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.set('transports', ['polling']);

const port = process.env.PORT || 4000;

app.use(bodyParser());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  next();
});

app.use(express.static('public'));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

server.listen(port, () => {
  console.log(`Running on port ${server.address().port}`);
});