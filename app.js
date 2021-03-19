// **** IMPORT PACKAGES  **** //

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
// !!! const multer = require('multer')
// static upload folder - https://stackoverflow.com/questions/15772394/how-to-upload-display-and-save-images-using-node-js-and-express
const { v4: uuidv4 } = require('uuid');

let photosArray = []; // Empty array that will filled with objects - photos
let seriesArray = []; // Empty array that will filled with objects - series
let staticData = [
  { photo: 'landscape-1.jpeg' },
  { photo: 'landscape-2.jpeg' },
  { photo: 'landscape-3.jpeg' },
  { photo: 'landscape-4.jpeg' },
  { photo: 'landscape-5.jpeg' },
];

// **** MIDDLEWARE SET-UP **** //
// Using static files from static directory
app.use(express.static('static'));

app.use(bodyParser.urlencoded({ extended: true }));

// Setting views (EJS)
app.set('views', './views');
app.set('view engine', 'ejs');

// ******** ROUTING ********** //

app.get('/', function (req, res) {
  res.render('index.ejs', { staticData });
});

app.get('/upload', function (req, res) {
  res.render('pages/upload', { staticData });
});

app.post('/upload', function (req, res) {
  const photoObject = {
    photo: req.body.photo,
    title: req.body.title,
    altText: req.body.altText,
    description: req.body.description,
    photographer: req.body.photographer,
    location: req.body.location,
    idPhoto: idCreator(),
  };

  photosArray.push(photoObject);
  console.log('photosArray', photosArray);
  res.redirect('/photos');
});

// Makes an unique ID for each data object
function idCreator() {
  const id = uuidv4();
  return id;
}

app.get('/photos', function (req, res) {
  res.render('pages/photos/overviewPhotos', { photosArray });
});

app.get('/photos/:id', function (req, res) {
  const idPhoto = req.params.id;
  const photoData = findObject(idPhoto, 'idPhoto', photosArray);
  if (photoData) {
    // Show correct id object from array
    res.render('pages/photos/detailPhotos', { photoData });
  } else {
    res.redirect('/error');
  }
});

// Finds the right object that is equal to the given id parameter
function findObject(id, idType, array) {
  if (idType == 'idSerie') {
    const correctObject = array.find((object) => {
      return object.idSerie == id;
    });
    return correctObject;
  } else if ((idType = 'idPhoto')) {
    const correctObject = array.find((object) => {
      return object.idPhoto == id;
    });
    return correctObject;
  }
}

// Get all series trough searching trhougin object with id of photos
app.get('/series/overview', function (req, res) {
  res.render('pages/series/overviewSeries', { seriesArray });
});

app.get('/series/detail/:id', function (req, res) {
  const idSerie = req.params.id;
  const serieData = findObject(idSerie, 'idSerie', seriesArray);
  if (serieData) {
    // Show correct id object from array
    res.render('pages/series/detailSeries', { serieData }); // + the photoObject data
  } else {
    res.redirect('/error');
  }
});

app.get('/series/detail/:id/show', function (req, res) {
  res.render('pages/series/show/choice', { serieData });
  console.log;

  // const idSerie = req.params.id;
  // const serieData = findObject(idSerie, 'idSerie', seriesArray);
  // if (serieData) {
  //   // Show correct id object from array
  //   console.log(serieData);
  //   res.render('pages/series/detailSeries', { serieData }); // + the photoObject data
  // } else {
  //   res.redirect('/error');
  // }
});

app.get('/series/detail/:id/show/carousel', function (req, res) {
  res.render('pages/series/show/carousel', { serieData });
});

app.get('/series/detail/:id/show/slideshow', function (req, res) {
  res.render('pages/series/show/slideshow', { serieData });
});

app.get('/series/new', function (req, res) {
  res.render('pages/series/newSerie', { photosArray });
});

app.post('/series/new', function (req, res) {
  const serieObject = {
    idSerie: idCreator(),
    titleSerie: req.body.titleSerie,
    selectedPhotos: req.body.selectedPhotos, // IDs of all photos
  };

  seriesArray.push(serieObject);
  console.log('seriesArray', seriesArray);
  res.redirect('/series/overview');
});

app.get('/error', function (req, res) {
  res.render('404');
});
app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
