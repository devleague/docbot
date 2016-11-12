'use strict';
const watson = require('watson-developer-cloud');
const Promise = require('bluebird');

if(!process.env.API_KEY){
  throw new Error('API_KEY not defined');
}

const alchemy_language = watson.alchemy_language({
  api_key: process.env.API_KEY 
});

function analyzeText(text) {

  let params = {
    text: text
  };

  return analyze(params);
}

function analyzeUrl(url){

  let params = {
    url: url
  };

  return analyze(params);
}

function analyze(params) {
  if(!params) {
    throw new Error('Params not passed to THE WATSON!');
  }
  return new Promise((resolve,reject) => {
    alchemy_language.entities(params, function (err, response) {
      if (err) {
        reject(err);  
      }
      else {
        console.log(response);
        resolve(response);
      }
    });
  });
}

module.exports = {
  analyzeUrl: analyzeUrl,
  analyzeText: analyzeText
};
