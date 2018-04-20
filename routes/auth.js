'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const bcryptSalt = 12;

router.get('/', function (req, res, next) {
  res.render('pages/index', { title: 'Express' });
});

module.exports = router;
