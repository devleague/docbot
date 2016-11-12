const Express = require('Express');
const Router = Express.Router();

Router.post('/', function(req, res) {
  res.json({
    success:true,
    payload: 'Hello'
  })
});

module.exports = Router; 
