const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const serieSchema = new Schema({
  titleSerie: String,
  images: Array,
});

exports.serieSchema = serieSchema;
module.exports = new mongoose.model('series', serieSchema);
