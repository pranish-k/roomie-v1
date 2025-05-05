require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const { sequelize } = require('./models');
require('./config/passport');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', require('./routes/auth'));
app.use('/group', require('./routes/group'));
app.use('/bills', require('./routes/bills'));
app.use('/chores', require('./routes/chores'));

app.get('/', (req, res) => {
  if (req.isAuthenticated()) return res.redirect('/dashboard');
  res.redirect('/auth/login');
});

app.get('/dashboard', (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/auth/login');
  res.render('dashboard', { user: req.user });
});

const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
