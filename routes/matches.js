'use strict';

const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const Spot = require('../models/spots');
const Match = require('../models/matches');
=======
const Spot = require('./../models/spots');
>>>>>>> ac032992e76003e4e1581473e8180e0232477120

/* GET home page. */

router.get('/json', (req, res, next) => {
  Spot.find()
    .then(result => {
      const spotLength = result.length;
      const randomSpot = result[Math.floor(Math.random() * spotLength)];
      res.json(randomSpot);
    })
    .catch(next);
});

router.get('/:matchId', (req, res, next) => {
  Match.findById(req.params.matchId)
    .then(result => {
      const data = {
        status: result.status
      };
      res.render('matches/matches', data);
    });
});

router.get('/json', function (req, res, next) {
  Spot.find({})
    .then(result => {
      res.json(result);
    })
    .catch(next);
});

module.exports = router;
