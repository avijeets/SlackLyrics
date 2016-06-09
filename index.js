var request = require('request');
var bodyParser = require('body-parser');
var express = require('express');
var url = require('url');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', (3000 || process.env.PORT));
app.get('/', function(req, res){ res.send('Server running.'); });