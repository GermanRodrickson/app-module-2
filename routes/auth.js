'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const bcryptSalt = 12;
const User = require('../models/users');

router.get('/login', (req, res, next) => {
  res.render('auth/login');
});

router.post('/login', (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect('/');
    return;
  }
  User.findOne({ username: req.body.username })
    .then(result => {
      if (!result) {
        console.log('nopeeeeeeeeeeeeeeeee');
        res.redirect('/auth/login');
        return;
      }
      if (bcrypt.compareSync(req.body.password, result.password)) {
        console.log('yaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaz');
        req.session.currentUser = result;
        res.redirect('/');
      } else {
        console.log('Password incoreect');
        res.redirect('/auth/login');
      }
    })
    .catch(next);
});

router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup', (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((result) => {
      if (result) {
        console.log('nopeeeeeeeeeeeeeeeeeeeeeeeee');
        return res.redirect('/auth/signup');
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(req.body.password, salt);

      const newUser = new User({
        username: req.body.username,
        password: hashPass
      });
      newUser
        .save()
        .then((result) => {
          req.session.currentUser = result;
          res.redirect('/');
        })
        .catch(next);
    })
    .catch(next);
});

router.post('/logout', (req, res, next) => {
  req.session.currentUser = null;
  res.redirect('/auth/login');
});

module.exports = router;
