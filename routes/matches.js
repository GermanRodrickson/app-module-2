'use strict';

const express = require('express');
const router = express.Router();
const Spot = require('./../models/spots');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('matches/matches');
});

router.get('/json', function (req, res, next) {
  Spot.find({})
    .then(result => {
      res.json(result);
    })
    .catch(next);
});

module.exports = router;
