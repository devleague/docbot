const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContentItem = new Schema({
  url: {type: String},
  entities: {type: Array},
  keywords: {type: Array},
  author: {type: String},
  count: {type: Number},
  date: {type: Date, default: Date.now }
})

module.exports = {
  contentItem: ContentItem
}

