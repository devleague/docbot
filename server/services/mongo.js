'use strict';
const mongoose = require('mongoose');
const Promise = require('bluebird');
const ContentItemSchema = require('../models/ContentItem').ContentItem;

if(!process.env.MONGO_URL){
  throw new Error('MONGO_URL not defined');
}

mongoose.connect(process.env.MONGO_URL);

const ContentItem = mongoose.model('ContentItem', ContentItemSchema);

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
  return new Promise((resolve, reject) => {
    ContentItem.find({entities: {$elemMatch: { text: {$regex: keyword, $options: 'i'} }}}).limit(Number(count)).find((err, items) => {
      if (err) {
        return reject(err);
      }

      items.sort(sortByRelevancy(keyword));

      const topItems = items.slice(0, count);

      return resolve(topItems);
    })
  });
}

function getTopContentItemByKeyword(keyword) {
  return new Promise((resolve, reject) => {
    ContentItem.find({entities: {$elemMatch: { text: {$regex: keyword, $options: 'i'} }}}, (err, items) => {
      if (err) {
        return reject(err);
      }

      items.sort(sortByRelevancy(keyword));

      const topItem = (items.length) > 0 ? items[0] : undefined;

      return resolve(topItem);
    })
  });
}

function getTopContentByPopularityCount() {
  return new Promise((resolve, reject) => {
    return ContentItem.find().sort({count: -1}).limit(10).find((err, latest) => {
      if (err) {
        return reject(err);
      }
      return resolve(latest)
    });
  })
}

function getLatestItems() {
  return new Promise((resolve, reject) => {
    return ContentItem.find().sort({$natural: -1}).limit(10).find((err, latest) => {
      if (err) {
        return reject(err);
      }
      return resolve(latest)
    });
  })
}

function getAllItems() {
  console.log('getting all')
  return new Promise((resolve, reject) => {
    return ContentItem.find((err, latest) => {
      if (err) {
        return reject(err);
      }
      return resolve(latest)
    });
  })
}

//private methods
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

function sortByRelevancy(keyword) {
  return function (first, second){
    const firstRelevance = first.entities.reduce(reduceByRelevancy(keyword), 0);
    const secondRelevance = second.entities.reduce(reduceByRelevancy(keyword), 0);

    if(firstRelevance > secondRelevance) {
      return -1;
    }

    if(firstRelevance === secondRelevance) {
      return 0;
    }

    if(firstRelevance < secondRelevance) {
      return 1;
    }
  }
}

function reduceByRelevancy(keyword){
  return function (a, b) {
    if( b.text && b.text.toLowerCase().indexOf(keyword.toLowerCase()) > -1){
      return b.relevance + a;
    }

    return a;
  }
}

module.exports = {
  addContentItem: addContentItem,
  getTopContentItemByKeyword: getTopContentItemByKeyword,
  getTopContentItemsByCountAndKeyword: getTopContentItemsByCountAndKeyword,
  getTopContentByPopularityCount: getTopContentByPopularityCount,
  getLatestItems: getLatestItems
};
