const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const axios = require('axios');

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {

  const url = 'https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist&type=single'
  axios.get(url)
  .then(response => {
    res.render('home', {joke: response.data.joke, category: response.data.category})
    console.log('200. Success');
  })
  .catch(error => {
    console.log(error);
  });


});

app.listen(9000, function() {
  console.log("Server started on port 9000.");
});
