// **** IMPORT PACKAGES  **** //

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');

let favouritesArray = []; // Empty array that will filled with objects through the hit like button

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

app.get('/photos', function (req, res) {
  res.render('pages/photos/overviewPhotos');
});

app.get('/photos/:id', function (req, res) {
  res.render('pages/photos/detailPhotos');
});

app.get('/series', function (req, res) {
  res.render('pages/series/overviewSeries');
});

app.get('/series/:id', function (req, res) {
  res.render('pages/series/detailSeries');
});

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
