// **** IMPORT PACKAGES  **** //

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const Images = require('./modules/models/image.js');
const Series = require('./modules/models/serie');

const path = require('path');
// const mongo = require('mongodb');
const mongoose = require('mongoose');
const multer = require('multer');
const storage = multer.diskStorage({
  // This adds a name and extension to the uploaded file
  // destination: function (req, file, cb) {
  //   cb(null, 'static/uploads/'); // location where the uploaded file needs to be stored
  // },
  destination: 'static/uploads/',
  filename: function (req, file, cb) {
    // changes file name to filename + date + original extension
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});

require('dotenv').config();
// database connection
const db = createConnection();

function createConnection() {
  const DB_USER = process.env.DB_USER;
  const DB_PASS = process.env.DB_PASS;
  const DB_NAME = process.env.DB_NAME;
  const URI = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_NAME}.ssfa5.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

  mongoose.connect(
    URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    (err) => {
      err ? console.log(err) : console.log('MongoDB is connected');
    }
  );

  return mongoose.connection;
}

// **** MIDDLEWARE SET-UP **** //
// Using static files from static directory
app.use(express.static('static'));

app.use(bodyParser.urlencoded({ extended: true }));

// Setting views (EJS)
app.set('views', './views');
app.set('view engine', 'ejs');

// ******** ROUTING ********** //

app.get('/', function (req, res) {
  res.render('index.ejs');
});

app.get('/upload', function (req, res) {
  res.render('pages/upload');
});

// upload photographs to server
app.post('/upload', upload.single('image'), function (req, res, next) {
  const imageObject = {
    image: req.file ? req.file.filename : null, // zet alles na de ? uit, dan krijg je een data object. Daar kan je meer mee.
    title: req.body.title,
    description: req.body.description,
    photographer: req.body.photographer,
    location: req.body.location,
  };

  createImage(imageObject);
  console.log('uploaded image', imageObject.image);

  function createImage({
    image,
    title,
    description,
    photographer,
    location,
    series,
  }) {
    Images.create({
      image: image,
      title: title,
      description: description,
      photographer: photographer,
      location: location,
      series: series,
    });
  }

  res.redirect('/photos');
});

app.get('/photos', async function (req, res) {
  // render photos with id and serach id and give it classname
  // last upload
  // 1. search ID from last object
  // 2. give class

  const images = await Images.find().catch((err) => console.log(err));
  images.reverse();
  if (images) {
    res.render('pages/photos/overviewPhotos', { images });
  } else {
    res.redirect('/error');
  }
});

app.get('/photos/:id', async (req, res) => {
  const image = await Images.findOne({
    _id: req.params.id,
  }).catch((err) => console.log(err));

  console.log('image data', image);
  res.render('pages/photos/detailPhotos', { image });
});

app.post('/photos/:id/edit', async (req, res) => {
  const updatedValues = {
    title: req.body.title,
    description: req.body.description,
    photographer: req.body.photographer,
    location: req.body.location,
  };

  await Images.updateOne(
    {
      _id: req.params.id,
    },
    updatedValues
  ).catch((err) => console.log(err));

  const image = await Images.findOne({
    _id: req.params.id,
  }).catch((err) => console.log(err));

  res.render('pages/photos/detailPhotos', { image });
});

app.post('/photos/:id/remove', async (req, res) => {
  await Images.findByIdAndDelete(req.params.id); // Delete image from Images collection

  // Delete image from Series collection (id)
  // const series = await Series.find().catch((err) => console.log(err));

  // const imageObject = series.images;
  // console.log(imageObject);
  // Series.forEach((serie) => console.log('serie data', serie));
  // await Series.findByIdAndDelete({ _id: { $in: req.params.id } });

  // 1. Loop over Series objects (Arr)
  // 2. Check in each object if there is in the images key thé ID
  // 3. delete that ID findbyIdAndDelete (2+3)

  // for loop - kijken of ID erinzit, zoja findby and delete

  res.redirect('/photos');
});

app.get('/series/overview', async function (req, res) {
  const series = await Series.find().catch((err) => console.log(err));

  if (series.length >= 1) {
    // Catch first image of every object
    // lop over series
    const images = await Images.find(series.images);
    console.log('serie - images: ', images);
    console.log('serie data: ', series);

    res.render('pages/series/overviewSeries', {
      series,
      images,
    });
  }

  res.render('pages/series/overviewSeries', { series });
});

app.get('/series/new', async function (req, res) {
  const images = await Images.find().catch((err) => console.log(err));
  res.render('pages/series/newSerie', { images });
});

app.post('/series/new', function (req, res) {
  const serieObject = {
    titleSerie: req.body.titleSerie,
    images: req.body.selectedPhotos,
  };

  createSerie(serieObject);

  function createSerie({ titleSerie, images, imagesNames }) {
    Series.create({
      titleSerie: titleSerie,
      images: images,
      imagesNames: imagesNames,
    });
  }

  res.redirect('/series/overview');
});

app.get('/series/detail/:id', async function (req, res) {
  const series = await Series.findOne({
    _id: req.params.id,
  }).catch((err) => console.log(err));

  const images = await Images.find({ _id: { $in: series.images } });

  console.log('serie data', series);
  res.render('pages/series/detailSeries', { series, images });
});

app.post('/series/detail/:id/remove', async function (req, res) {
  await Series.findByIdAndDelete(req.params.id);
  res.redirect('/series/overview');
});

// Delete image from serie
// app.post('/series/detail/:id/deleteImage', async function (req, res) {
//   // 1. Search ID (req.params.id) in Series collection ($in)
//   const id = req.params.id;
//   const series = await Series.find().catch((err) => console.log(err));

//   await Series.findByIdAndDelete({ id: { $in: series.images } });

//   // Splice from array

//   res.redirect('/series/overview');
// });

app.get('/series/detail/:id/slideshow', async function (req, res) {
  const series = await Series.findOne({
    _id: req.params.id,
  }).catch((err) => console.log(err));

  const images = await Images.find({ _id: { $in: series.images } });

  console.log('Data image', images);
  console.log('Data serie', series);
  res.render('pages/series/show/slideshow', { series, images });
});

app.get('/series/detail/:id/carousel', function (req, res) {
  res.render('pages/series/carousel');
});

app.get('/error', function (req, res) {
  res.render('404');
});

app.get('/offline', function (req, res) {
  res.render('offline');
});

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
