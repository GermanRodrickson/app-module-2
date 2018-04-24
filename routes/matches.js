'use strict';

const express = require('express');
const router = express.Router();
const Spot = require('../models/spots');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('matches/matches');
});

router.get('/json', (req, res, next) => {
  Spot.find()
    .then((result) => {
      const spotLength = result.length;
      const randomSpot = result[Math.floor(Math.random() * spotLength)];
      res.json(randomSpot);
    })
    .catch(next);
});

module.exports = router;
