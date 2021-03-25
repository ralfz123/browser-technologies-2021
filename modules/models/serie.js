const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const serieSchema = new Schema({
  titleSerie: String,
  series: true,
  images: { _id: String },
//   images: [imageSchema] --> whole image object is accessible
});

exports.serieSchema = serieSchema;
module.exports = new mongoose.model('series', serieSchema);
