'use strict';

function getDocuments(data){
  if (data.url){
    return parseSingle(data);
  }else if (data.length > 0){
    return parseMany(data);
  }else{
    return 'Not Found';
  }
}

function parseSingle(data) {
  return data.url;
}

function parseMany(data) {
  let urls = [];
  for (var i = 0; i < data.length; i++){
    urls.push(data[i].url);
  }
  return urls;
}

module.exports = {
  getDocuments: getDocuments
}
