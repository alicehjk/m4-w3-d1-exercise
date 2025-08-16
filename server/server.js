'use strict';
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'html')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'session-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 60000 }
}));

const USERS = { paul: 'paul', joy: 'joy', ray: 'ray' };

function auth(req, res, next) {
  if (req.session.user) return next();
  res.redirect('/login.html');
}

app.get('/', auth, (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'index.html'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (USERS[username] && USERS[username] === password) {
    req.session.user = { username };
    return res.redirect('/');
  }
  res.redirect('/login.html?info=Invalid+credentials');
});

app.get('/whoami', auth, (req, res) => {
  res.json(req.session.user || {});
});

app.get('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if (err) return next(err);
    res.clearCookie('connect.sid');
    res.sendFile(path.join(__dirname, 'html', 'logout.html'));
  });
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
