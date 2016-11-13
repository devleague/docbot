const Express = require('express');
const Router = Express.Router();
const MongoService = require('../services/mongo');
const SlackService = require('../services/slack');

Router.post('/', function(req, res) {
  const keyword = req.body.text;

  MongoService.getTopContentItemByKeyword(keyword)
    .then(result => {
      return res.json(SlackService.getDocuments(result))
    })
    .catch(e => {
      return res.send('Not Found');
    })
});

module.exports = Router;
