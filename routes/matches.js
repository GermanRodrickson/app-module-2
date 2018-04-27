'use strict';

const express = require('express');
const router = express.Router();
const Spot = require('../models/spots');
const Match = require('../models/matches');

/* GET home page. */

router.get('/json', (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect('/');
  }
  Spot.find()
    .then(result => {
      const spotLength = result.length;
      const randomSpot = result[Math.floor(Math.random() * spotLength)];
      res.json(randomSpot);
    })
    .catch(next);
});

router.get('/:matchId', (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect('/');
  }
  Match.findById(req.params.matchId)
    .then(result => {
      const data = {
        matchId: result._id,
        status: result.status,
        img: result.picture
      };
      res.render('matches/matches', data);
    })
    .catch(next);
});

module.exports = router;
