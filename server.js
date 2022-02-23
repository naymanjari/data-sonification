
var express = require('express');

var app = express();
var server = app.listen(8080);
//const maxApi = require('max-api');
//maxApi.addHandler('phase', () => {
  //maxApi.post(path); //how to retrieve phase from sketch.js
//});

app.use(express.static('data_sonification'));

console.log("The server is running");