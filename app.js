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
    series: false,
  };

  createImage(imageObject);

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

app.get('/photos', async function (req, res, next) {
  const images = await Images.find().catch((err) => console.log(err));
  // images.reverse();
  console.log(images);
  if (images) {
    res.render('pages/photos/overviewPhotos', { images });
  } else {
    res.redirect('/404');
  }
});

app.get('/photos/:id', async (req, res) => {
  const image = await Images.findOne({
    _id: req.params.id,
  }).catch((err) => console.log(err));

  console.log('data', image);
  res.render('pages/photos/detailPhotos', { image });
});

app.get('/series/overview', async function (req, res, next) {
  const series = await Series.find().catch((err) => console.log(err));
  // Data from the images that are in the serie, find by Id
  // const images = await Images.find().catch((err) => console.log(err));

  const imageIds = series;
  console.log('image IDs', imageIds);

  const images = getImage(imageIds);

  function getImage(id) {
    console.log('id', id);
    Images.findById(id, (err) => console.log(err));
  }

  console.log('series', series);
  res.render('pages/series/overviewSeries', {
    series,
    // ,     images
  });
});

app.get('/series/new', async function (req, res) {
  const images = await Images.find().catch((err) => console.log(err));
  res.render('pages/series/newSerie', { images });
});

app.post('/series/new', function (req, res) {
  const serieObject = {
    titleSerie: req.body.titleSerie,
    images: req.body.selectedPhotos,
    // imagesNames: req.body.imageName, //(for in ejs, /uploads/)
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

  console.log('data', series);
  res.render('pages/series/detailSeries', { series });
});

app.get('/series/detail/:id/slideshow', async function (req, res) {
  const series = await Series.findOne({
    _id: req.params.id,
  }).catch((err) => console.log(err));

  // function getImage({ _id }) {
  //   Images.findById(_id, err => console.error(chalk.red(err)))
  // }
  // const idImages = series.images;
  // const images = await Images.find(idImages).catch((err) =>
  //   console.error(chalk.red(err))
  // );

  // console.log(idImages);
  // console.log(images);

  console.log('Data serie', series);
  res.render('pages/series/show/slideshow', { series });
});

app.get('/series/detail/:id/carousel', function (req, res) {
  res.render('pages/series/carousel');
});

app.get('/error', function (req, res) {
  res.render('404');
});
app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
