const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { User } = require('../models');
const router = express.Router();

router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    await User.create({ name, email, passwordHash: hash });
    res.redirect('/auth/login');
  } catch (err) {
    res.send('Error: ' + err.message);
  }
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/auth/login'
}));

router.get('/logout', (req, res) => {
  req.logout(() => res.redirect('/auth/login'));
});

module.exports = router;
