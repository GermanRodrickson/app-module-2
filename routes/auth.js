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
        res.redirect('/auth/login');
        return;
      }
      if (bcrypt.compareSync(req.body.password, result.password)) {
        req.session.currentUser = result;
        res.redirect('/cards');
      } else {
        res.redirect('/auth/login');
      }
    })
    .catch(next);
});

router.get('/signup', (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect('/');
    return;
  }
  res.render('auth/signup');
});

router.post('/signup', (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((result) => {
      if (result) {
        return res.redirect('/auth/signup');
      }

      let img;
      const womenImgs = ['/images/profile-images/women1.jpeg', '/images/profile-images/women2.jpeg', '/images/profile-images/women3.jpg', '/images/profile-images/women4.jpg', '/images/profile-images/women5.jpg', '/images/profile-images/women6.jpg'];
      const manImgs = ['/images/profile-images/men1.jpg', '/images/profile-images/men2.jpeg', '/images/profile-images/men3.jpg', '/images/profile-images/men4.jpg', '/images/profile-images/men5.jpeg', '/images/profile-images/men6.jpeg'];

      if (req.body.gender === 'Women') {
        img = womenImgs[Math.floor(Math.random() * womenImgs.length)];
      } else {
        img = manImgs[Math.floor(Math.random() * manImgs.length)];
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(req.body.password, salt);

      const newUser = new User({
        username: req.body.username,
        password: hashPass,
        picture: img,
        age: req.body.age,
        email: req.body.email,
        gender: req.body.gender,
        interestedin: req.body.interestedin,
        description: req.body.description
      });
      newUser
        .save()
        .then((result) => {
          req.session.currentUser = result;
          res.redirect('/cards');
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
