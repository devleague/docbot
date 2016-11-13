'use strict';
const Promise = require('bluebird');
const MongoService = require('./mongo');

function delegateAction(cmd){
  return new Promise((resolve, reject) => {
    const reg = /([a-zA-Z\s]+)a*(\d)(th|st|rd|nd)*/;
    const nth = ['th', 'st', 'rd', 'nd'];
    const actions = ['random', 'all']
    const params = cmd.split(reg);

    let keyword = "";
    let numAction = 0;
    let wordAction = "";

    if (params.length === 1){
      let query = params[0].toLowerCase().split(' ');
      if(query.length === 1){
        keyword = query[0];
      }else if (query.length >= 2){
        if (query[1].indexOf(actions) > -1 ){
          keyword = query[0];
          wordAction = query[1];
        }else {
          keyword = `${query[0]} ${query[1]}`;
          wordAction = query[2];
        }
      }
      return resolve(MongoService.getTopContentItemsByCountAndKeyword(keyword));
    }else if (params.length > 1){
      if (!params[3]){
        keyword = params[1].trim();
        numAction = Number(params[2]);
        return resolve(MongoService.getTopContentItemsByCountAndKeyword(keyword, numAction))
      }else if (nth.indexOf(params[3]) > -1){
        // find the position of the links
        return reject('Not Accessible Yet')
      }
    }
  });
}

function parseDocuments(data){
  if (data.url){
    return parseSingle(data);
  }else if (data.length > 0){
    return parseMany(data);
  }else{
    return 'Not Found';
  }
}

// private static functions
function parseSingle(data) {
  return data.url;
}

function parseMany(data) {
  let urls = [];
  for (var i = 0; i < data.length; i++){
    urls.push(data[i].url);
  }
  return urls.join('\n');
}

module.exports = {
  delegateAction: delegateAction,
  parseDocuments: parseDocuments
}
