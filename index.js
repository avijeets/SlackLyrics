var request = require('request');
var bodyParser = require('body-parser');
var express = require('express');
var url = require('url');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', (3000 || process.env.PORT));
app.get('/', function(req, res){ res.send('Server running.'); });

app.post('/post', function(req, res){
  var parsed_url = url.format({
    pathname: 'https://api.genius.com/search',
    query: {
      access_token: process.env.GENIUS_ACCESS,
      q: req.body.text
    }
  });

  request(parsed_url, function (error, response, body) {
    if (response.statusCode == 200 && !error) {
      var data = JSON.parse(body);
      var first_url = data.response.hits[0].result.url;
      var body = {
        response_type: "in_channel",
        text: first_url
      };
      res.send(body);
    }
  });
});

app.listen(app.get('port'), function() { console.log('Open localhost:', app.get('port'), 'on your browser.'); });
