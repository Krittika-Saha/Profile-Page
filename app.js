const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const axios = require('axios');
const mongoose = require('mongoose');

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

let name = ''

mongoose.connect("mongodb+srv://admin-krittika:test123@krittikasahapersonalweb.n8pxt.mongodb.net/contactDB?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})

const postSchema = {
  name: {
    type: String,
    required: true
  },
  email: String,
  title: {
    type: String,
    required: true
  },
  content:  {
    type: String,
    required: true
  }
};

const Post = mongoose.model("Post", postSchema);

let contacts = [];

app.get('/', function(req, res) {

  const url = 'https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist&type=single'
  axios.get(url)
  .then(response => {
    res.render('home', {joke: response.data.joke, category: response.data.category})
  })
  .catch(error => {
    console.log(error);
  });


});

app.post('/', function(req, res) {
  name = req.body.postName
  const post = new Post ({
    name: req.body.postName,
    email: req.body.userEmail,
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save();

  res.render("sent.ejs");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 9000;
}
app.listen(port, function() {
  console.log("Server started successfully.");
});
