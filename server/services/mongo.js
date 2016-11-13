'use strict';
const mongoose = require('mongoose');
const Promise = require('bluebird');
const schema = require('../models/contentitem');

if(!process.env.MONGO_URL){
  throw new Error('MONGO_URL not defined');
}

mongoose.connect(process.env.MONGO_URL);

const ContentItem = mongoose.model('ContentItem', schema.contentItem);

function convertToSchema(data){
  let result = {
    url: "",
    entities: [],
    keywords: [],
    author: "",
    count: 0,
  };

  for (var key in data){
    if (key === 'entities'){
      for (var i = 0; i < data[key].length; i++) {
        result.keywords.push(data[key][i].text);
      }
    }
    if (key === 'url'){
      result.url = data[key];
    }
    if (key === 'entities'){
      result.entities = data[key];
    }
    if (key === 'author'){
      result.author = data[key] ? data[key] : "";
    }
  }
  return result;
}

function addContentItem(data){
  return new Promise((resolve, reject) => {
    const item = new ContentItem(convertToSchema(data));
    item.save(err => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });
}

function getTopContentItemsByCountAndKeyword(keyword, count) {

}

function getTopContentItemByKeyword(keyword) {
  return new Promise((resolve, reject) => {
    ContentItem.findOne({'data': keyword}), 'url', (err, item) => {
      if (err) {
        return reject(err);
      }

      return resolve(item);
    }
  });
}

function getLatestItems(){
  return new Promise((resolve, reject) => {
    return ContentItem.find().sort({$natural: -1}).limit(10).find((err, latest) => {
      if (err) {
        return reject(err);
      }
      return resolve(latest)
    });
  })
}

module.exports = {
  addContentItem: addContentItem,
  getTopContentItemByKeyword: getTopContentItemByKeyword,
  getTopContentItemsByCountAndKeyword: getTopContentItemsByCountAndKeyword,
  getLatestItems: getLatestItems
};
