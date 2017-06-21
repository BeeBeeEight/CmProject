var config = require('./config.json');
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var token;

app.set('PORT', config.webPort);

app.all('*', function(request, response, next) {
 console.log(request.method + " " + request.url);
 next();
})

app.use(bodyParser.json()); // parse application/json

//app.use('/auth', require('./routes/auth'));
app.use('/tickets', require('./routes/tickets'));


app.all('*', function(request, response) {
 response.status(404);
 response.send('404 - Not found');
})

var port = process.env.PORT || app.get('PORT');
app.listen(port, function() {
 console.log('Server app is listening on port' + port);
})