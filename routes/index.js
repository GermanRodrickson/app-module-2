'use strict';

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('pages/index');
});

router.get('/sg', (req, res, next) => {
  res.render('styleguide/styleguide');
});

module.exports = router;
