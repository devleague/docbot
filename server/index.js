//load ENV first
require('dotenv').config({silent:true});

//instantiate express server
const express = require('express')
const app = express()
const alchemy = require('./services/alchemy');

const SlackRoute = require('./routes/slack');

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.use('/slack', SlackRoute);

app.get('/', function(request, response) {
  response.send('DOCBOT HOMIES @.@.....REPRESENT')
})

app.get('/analyze', function(req, res) {
  const url = req.params.url; 

  alchemy.analyze(url)
    .then(result => {
      res.json('OK');
    })
    .catch(e => {
      return res.json(500, e);
    });
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
