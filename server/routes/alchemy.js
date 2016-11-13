const Express = require('express');
const Router = Express.Router();
const AlchemyService = require('../services/alchemy');
const MongoService = require('../services/mongo');

Router.post('/analyze', (req, res) => {
  const url = req.body.url;

  AlchemyService.analyzeUrl(url)
    .then( result => {
      return MongoService.addContentItem(result);
    })
    .then(() => {
      return res.json('OK');
    })
    .catch(e => {
      return res.json(500, e);
    });
});

Router.get('/query/:keyword', (req, res) => {
  const keyword = req.params.keyword;

  if(!keyword){
    return res.json(400, 'No keyword specified');
  }

  MongoService.getTopContentItemByKeyword(keyword)
    .then( result => {
      return res.json(result);
    })
    .catch(e => {
      return res.json(500, e);
    });
});

Router.get('/latest', (req, res) => {
  MongoService.getLatestItems()
    .then(result => {
      return res.json(result);
    })
    .catch(e => {
      return res.json(500, e);
    });
})

module.exports = Router;
