//load ENV first
require('dotenv').config({silent:true});

//instantiate express server
const express = require('express')
const app = express()
const bodyParser = require('body-parser');

const SlackRoute = require('./routes/slack');
const AlchemyRoute = require('./routes/alchemy');

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.use('/slack', SlackRoute);
app.use('/alchemy', AlchemyRoute);

app.get('/', function(request, response) {
  response.send('DOCBOT HOMIES @.@.....REPRESENT');
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
})
