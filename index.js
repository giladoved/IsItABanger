var request = require('request');
var express = require('express');
var app = express();
var auth = config.server_auth;

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/'));

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/auth', function(req, res) {
	request({
	    headers: {
	    	'Accept': '*/*',
        	'Content-Type': 'application/x-www-form-urlencoded',
        	'User-Agent': 'runscope/0.1',
	    	'Authorization': 'Basic ' + auth
	    },
	    url: 'https://accounts.spotify.com/api/token',
        body: "grant_type=client_credentials",
	    method: 'POST',
	    json: true
	}, function (error, response, body) {
		if (error) {
			res.err(error);
		}

		console.log(response.body.access_token);
		res.send(response.body.access_token);
	});
});