const express = require('express');
const user = require('./src/controller/user');

const app = express();

app.use(express.urlencoded({extended:false}));

app.get("/", (req, res) => {
  res.sendFile(__dirname+'/views/index.html');
})

app.post('/api/new', (req, res) => {
  user.addNew(req, res);
  //res.send({ express: 'Hello World' });
});

app.get('/api/all', (req, res) => {
  user.getAll(req, res);
  //res.send({ express: 'Hello World' });
});

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Listening on port ${port}`));