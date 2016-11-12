'use strict';
const mongoose = require('mongoose');
const Promise = require('bluebird');  

if(!process.env.MONGO_URL){
  throw new Error('MONGO_URL not defined');
}

mongoose.connect(process.env.MONGO_URL);

const ContentItem = mongoose.model('ContentItem', {data: Object});

function addContentItem(data){
  return new Promise((resolve, reject) => {
    const item = new ContentItem({data: data});
    item.save(err => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });
}

module.exports = {
  addContentItem: addContentItem
};
