
// load ENV first
require('dotenv').config({silent:true});

// helpers
const path = require('path');

// instantiate express server
const express = require('express')
const app = express()
const bodyParser = require('body-parser');

// configure express server
app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// application-wide middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

// route controllers
const SlackRoute = require('./routes/slack');
const AlchemyRoute = require('./routes/alchemy');

// mount route controllers
app.use('/slack', SlackRoute);
app.use('/alchemy', AlchemyRoute);

app.get('/', (request, response) => {
  response.render('index');
});

app.get('/admin', (req, res) => {
  res.render('page-admin/admin');
})

app.get('/additions', (req, res) => {
  res.render('page-additions/additions');
})

app.get('/recent', (req, res) => {
  res.render('page-recent/recent');
})

app.get('/popular', (req, res) => {
  res.render('page-popular/popular');
})

app.listen(app.get('port'), _ => {
  console.log("Node app is running at localhost:" + app.get('port'));
});
