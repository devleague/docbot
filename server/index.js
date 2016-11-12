var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello from Node Knockout 2016!')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

// POST '/slack' respond back to res.json success: true, payload: Hello

app.post('/slack', function(req, res) {
  res.json({
    success:true,
    payload: 'Hello'
  })
});
