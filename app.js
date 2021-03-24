// **** IMPORT PACKAGES  **** //

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
// const { v4: uuidv4 } = require('uuid');

const path = require('path');
const mongo = require('mongodb');
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
let db = null;
const uri = process.env.DB_HOST;

mongo.MongoClient.connect(
  uri,
  {
    useUnifiedTopology: true,
  },
  function (err, client) {
    if (err) {
      throw err;
    }

    db = client.db(process.env.DB_NAME);
    // console.log('Connected correctly to MongoDB server');
  }
);

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
  const photoObject = {
    image: req.file ? req.file.filename : null, // zet alles na de ? uit, dan krijg je een data object. Daar kan je meer mee.
    title: req.body.title,
    description: req.body.description,
    photographer: req.body.photographer,
    location: req.body.location,
    // idPhoto: idCreator(),
  };

  db.collection('data').insertOne(photoObject, renderPage());

  function renderPage(err, data) {
    if (err) {
      next(err);
    } else {
      res.redirect('/');
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

  renderPage(allData);

  function renderPage(allData) {
    console.log('this is all data', allData);
    res.render('pages/photos/overviewPhotos', {
      data: allData,
    });
  }
});

app.get('/photos/:id', function (req, res, next) {
  // create new object ID to refer to the params
  let ObjectId = mongo.ObjectId;
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
        res.render('pages/photos/detailPhotos', {
          data: data,
        });
      } else {
        console.log('Error: client ID could not been found!');
        res.send('cant find photo');
      }
    }
  );
});

// // Finds the right object that is equal to the given id parameter
// function findObject(id, idType, array) {
//   if (idType == 'idSerie') {
//     const correctObject = array.find((object) => {
//       return object.idSerie == id;
//     });
//     return correctObject;
//   } else if ((idType = 'idPhoto')) {
//     const correctObject = array.find((object) => {
//       return object.idPhoto == id;
//     });
//     return correctObject;
//   }
// }

// // Get all series trough searching trhougin object with id of photos
// app.get('/series/overview', function (req, res) {
//   res.render('pages/series/overviewSeries', { seriesArray });
// });

// app.get('/series/detail/:id', function (req, res) {
//   const idSerie = req.params.id;
//   const serieData = findObject(idSerie, 'idSerie', seriesArray);
//   if (serieData) {
//     // Show correct id object from array
//     res.render('pages/series/detailSeries', { serieData }); // + the photoObject data
//   } else {
//     res.redirect('/error');
//   }
// });

// app.get('/series/detail/:id/show', function (req, res) {
//   res.render('pages/series/show/choice', { serieData });
//   console.log;

//   // const idSerie = req.params.id;
//   // const serieData = findObject(idSerie, 'idSerie', seriesArray);
//   // if (serieData) {
//   //   // Show correct id object from array
//   //   console.log(serieData);
//   //   res.render('pages/series/detailSeries', { serieData }); // + the photoObject data
//   // } else {
//   //   res.redirect('/error');
//   // }
// });

// app.get('/series/detail/:id/show/carousel', function (req, res) {
//   res.render('pages/series/show/carousel', { serieData });
// });

// app.get('/series/detail/:id/show/slideshow', function (req, res) {
//   res.render('pages/series/show/slideshow', { serieData });
// });

// app.get('/series/new', function (req, res) {
//   res.render('pages/series/newSerie', { photosArray });
// });

// app.post('/series/new', function (req, res) {
//   const serieObject = {
//     // idSerie: idCreator(),
//     titleSerie: req.body.titleSerie,
//     selectedPhotos: req.body.selectedPhotos, // IDs of all photos
//   };

//   seriesArray.push(serieObject);
//   console.log('seriesArray', seriesArray);
//   res.redirect('/series/overview');
// });

app.get('/error', function (req, res) {
  res.render('404');
});
app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
