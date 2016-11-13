const Express = require('express');
const Router = Express.Router();
const MongoService = require('../services/mongo');
const SlackService = require('../services/slack');

Router.post('/', function(req, res) {
  const command = req.body.text;

  SlackService.delegateAction(command)
    .then(result => {
      return res.json(SlackService.parseDocuments(result))
    })
    .catch(e => {
      return res.send('Not Found')
    })
});

module.exports = Router;
