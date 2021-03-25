// **** IMPORT PACKAGES  **** //

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const Images = require('./modules/models/image.js');

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
// let db = null;
// const uri = process.env.DB_HOST;

// mongo.MongoClient.connect(
//   uri,
//   {
//     useUnifiedTopology: true,
//   },
//   function (err, client) {
//     if (err) {
//       throw err;
//     }

//     db = client.db(process.env.DB_NAME);
//   }
// );

// createConnection();

const db = createConnection();

function createConnection() {
  const URI = process.env.DB_HOST;

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

  const imageObjectSchema = createImage(imageObject);

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

  // checker when the inputs are null, then don't make object

  db.collection('data').insertOne(imageObjectSchema, renderPage());
  // checker when the inputs are null, then don't make object

  function renderPage(err, data) {
    if (err) {
      next(err);
    } else {
      res.redirect('/photos');
    }
  }
});

// Makes an unique ID for each data object
// function idCreator() {
//   const id = uuidv4();
//   return id;
//}

app.get('/photos', async function (req, res, next) {
  const allData = await db.collection('data').find().toArray();
  allData.reverse();

  const photos = allData.filter((data) => {
    return data.series === false;
  });

  renderPage(photos);
  function renderPage(photos) {
    res.render('pages/photos/overviewPhotos', {
      data: photos,
    });
  }
});

app.get('/photos/:id', function (req, res, next) {
  let id = req.params.id
  console.log(id)

  Images.findOne({
      _id: id,
    },
    (err, data) => {
      if (err) {
        console.error('MongoDB Error:' + err);
      }
      if (data) {
        res.render('pages/photos/detailPhotos', {
          data: data,
        });
      } else {
        console.log('Error: client ID could not been found!');
        res.redirect('/error');
      }
    }
  );
});

// Get all series trough searching trhougin object with id of photos
app.get('/series/overview', async function (req, res, next) {
  const allData = await db.collection('data').find().toArray();
  allData.reverse();

  const series = allData.filter((data) => {
    return data.series === true;
  });

  renderPage(series);
  function renderPage(series) {
    res.render('pages/series/overviewSeries', {
      data: series,
    });
  }
});

app.get('/series/new', async function (req, res) {
  const allData = await db.collection('data').find().toArray();
  allData.reverse();

  const photos = allData.filter((data) => {
    return data.series === false;
  });

  renderPage(photos);
  function renderPage(photos) {
    res.render('pages/series/newSerie', {
      data: photos,
    });
  }
});

app.post('/series/new', function (req, res) {
  const serieObject = {
    titleSerie: req.body.titleSerie,
    series: true,
    images: req.body.selectedPhotos,
  };

  console.log(serieObject);

  // checker when the inputs are null, then don't make object

  db.collection('data').insertOne(serieObject, renderPage());
  // checker when the inputs are null, then don't make object

  function renderPage(err, data) {
    if (err) {
      next(err);
    } else {
      res.redirect('/series/overview');
    }
  }
});

app.get('/series/detail/:id', function (req, res) {
  let ObjectId = mongoose.ObjectId;
  let id = req.params.id;
  let searchID = new ObjectId(id);

  db.collection('data').findOne(
    {
      _id: searchID,
    },
    (err, data) => {
      if (err) {
        console.log('MongoDB Error:' + err);
      }
      if (data) {
        console.log('detail serie', data);
        res.render('pages/series/detailSeries', {
          data: data,
        });
      } else {
        console.log('Error: client ID could not been found!');
        res.redirect('/error');
      }
    }
  );
});

// app.get('/series/detail/:id/show', function (req, res) {
//   res.render('pages/series/show/choice', { serieData });
// });

// app.get('/series/detail/:id/show/carousel', function (req, res) {
//   res.render('pages/series/show/carousel', { serieData });
// });

// app.get('/series/detail/:id/show/slideshow', function (req, res) {
//   res.render('pages/series/show/slideshow', { serieData });
// });

app.get('/error', function (req, res) {
  res.render('404');
});
app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
