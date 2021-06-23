require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');
const login = express.Router();
const bodyParser = require('body-parser');
const session = require('express-session');
const sha256 = require('./sha256');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../views'));
app.use(bodyParser());
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'shhhh, very secret'
}));

login.get('/login', (req, res) => {
  if (req.session.userid) {
    res.redirect('/');
    return;
  }
  res.render('login');
  return;
});

login.post('/login', (req, res) => {
  if (req.session.userid) {
    res.redirect('/');
    return;
  }
  /* TODO: Authenticate */

});

function hash(password) {
  const salt = getRandomString(10);
  const befHashed = password + salt;
  const hashed = sha256(befHashed);

  return hashed;
}

function getRandomString(length) {
  const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++ ) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
}

app.use(login);

app.get('/*', (req, res) => {
  res.render('404');
});

app.listen(port, () => {
  console.log(`Starting server at port: ${port}`);
});