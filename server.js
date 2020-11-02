// Init project
const express = require('express');
const user = require('./src/controller/user');
const { check, validationResult } = require('express-validator');

const app = express();
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({extended:true}));

/**
 * Route for backend index page
 */
app.get("/", (req, res) => {
  res.sendFile(__dirname+'/views/index.html');
})

/**
 * Route for adding new record
 */
app.post('/api/new', [
    check('name').isAlphanumeric()
  ], (req, res) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }
    user.addNew(req, res);
});

/**
 * Route for retrieving all records
 */
app.get('/api/all', (req, res) => {
  user.getAll(req, res);
});

const port = process.env.PORT || 3001;

// Listen for requests
app.listen(port, () => console.log(`Listening on port ${port}`));