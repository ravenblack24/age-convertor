const express = require('express');
const user = require('./src/controller/user');
const { check, validationResult } = require('express-validator');

const app = express();
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
  res.sendFile(__dirname+'/views/index.html');
})

app.post('/api/new', (req, res) => {
//   [
//     check('name').isAlphanumeric(),
//     check('date').isDate()
//   ], 
// const errors = validationResult(req);
// if(!errors.isEmpty()) {
//   return res.status(422).json({errors: errors.array()});
// }
  user.addNew(req, res);

});

app.get('/api/all', (req, res) => {
  user.getAll(req, res);
});

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Listening on port ${port}`));