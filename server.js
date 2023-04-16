// Require stuff here
require('dotenv').config();
const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.static('public'));

// Set db
require('./data/reddit-db');

// Middleware goes here

const hbs = handlebars.create({
    helpers: {}
});

// App config here
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // Add this after you initialize express.

// Require controllers
require('./controllers/auth.js')(app);
require('./controllers/posts')(app);
require('./controllers/comments')(app);

// Routes here
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/posts/new', (req, res) => {
  console.log("posting!")
  res.render('posts-new');
});

app.get('/users/new', (req, res) => {
  console.log("making a user!")
  res.render('users-new');
});

app.listen(3000, () => {
  console.log('Reddit Clone listening on port localhost:3000!');
});

module.exports = app;