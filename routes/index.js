'use strict';

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect('/auth/login');
  }
  res.render('pages/index');
});

router.get('/sg', (req, res, next) => {
  res.render('styleguide/styleguide');
});

module.exports = router;
