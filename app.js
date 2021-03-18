// **** IMPORT PACKAGES  **** //

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
// !!! const multer = require('multer')
// static upload folder

let photosArray = []; // Empty array that will filled with objects through the hit like button

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

app.post('/upload', function (req, res) {
  const photoObject = {
    photo: req.body.photo,
    title: req.body.title,
    altText: req.body.altText,
    description: req.body.description,
    photographer: req.body.photographer,
    location: req.body.location,
    // id: countObjectArray(1),
    id: 1,
  };

  photosArray.push(photoObject);
  console.log(photosArray);
  res.redirect('/photos');
});

// Makes an unique ID for each data object
function countObjectArray(numberObject) {
  const teller = 1;
  let num = numberObject + teller;
}

app.get('/photos', function (req, res) {
  res.render('pages/photos/overviewPhotos', { photosArray });
});

app.get('/photos/:id', function (req, res) {
  const photoData = findObject(req.params.id, photosArray);
  if (photoData) {
    // Show correct id object from array
    console.log(photoData);
    res.render('pages/photos/detailPhotos', { photoData });
  } else {
    res.redirect('/error');
  }
});

// Finds the right object that is equal to the given id parameter
function findObject(id, photosArray) {
  const correctObject = photosArray.find((object) => {
    return object.id == id;
  });
  return correctObject;
}

app.get('/series', function (req, res) {
  res.render('pages/series/overviewSeries');
});

app.get('/series/:id', function (req, res) {
  res.render('pages/series/detailSeries');
});

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
