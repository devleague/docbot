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
      res.json('OK');
    })
    .catch(e => {
      return res.json(500, e);
    });
});

module.exports = Router; 
