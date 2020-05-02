const express = require ('express');
const connection = require('./config')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

connection.connect(function (err) {
  if (err) {
      console.error(err);
      return;
  }
  console.log('connected as id ' + connection.threadId);
});

app.get('/', (req, res) => {
  res.send('it worksss YEES!')
})

app.get('/todo', (req, res) => {
  connection.query('SELECT * FROM todo', (err, results) => {
    if(err) {
      res.status(500).send(err)
    } else {
      res.json(results)
    }
  })
})

app.post('/todo', (req, res) => {
  console.log(req.body)
  const formData = {
    title: req.body.title,
    text: req.body.text
  }
  connection.query('INSERT INTO todo SET ?', formData, (err) => {
    if(err){
      res.status(500).send(err)
    } else {
      res.sendStatus(200)
    }
  })
});



app.listen(port, (err) => {
  if(err) {
    throw new Error('Something did not work');
  }
  console.log(`Server is listening on port ${port}`);
});
