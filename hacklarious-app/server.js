var express = require('express');
var app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(bodyParser.json());
app.use(cors);
app.get('/', function (req, res) {
  res.send('Hello World!'); // This will serve your request to '/'.
});

app.post('/', (req, res) => {
  console.log('got it')
  console.log(req.body)
  res.send('yeet');
})

app.listen(5000, function () {
  console.log('Example app listening on port 5000!');
 });