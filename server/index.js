var express = require('express')
var app = express()

const SlackRoute = require('./routes/slack');

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.use('/slack', SlackRoute);

app.get('/', function(request, response) {
  response.send('Hello from Node Knockout 2016!')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
