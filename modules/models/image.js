const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imageSchema = new Schema({
  image: String,
  title: String,
  description: String,
  photographer: String,
  location: String,
  series: false,
});

exports.imageSchema = imageSchema;
module.exports = new mongoose.model('Images', imageSchema);
