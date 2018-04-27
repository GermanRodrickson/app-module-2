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

router.post('/savespot', (req, res, next) => {
  Match.findById(req.body.matchId)
    .then(result => {
      result.spot = req.body.spot;
      return result.save();
    })
    .catch(next);
});

router.get('/:matchId', (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect('/');
  }
  Match.findById(req.params.matchId)
    .populate('receiver sender')
    .then(result => {
      const matchUser = result.sender.username === req.session.currentUser.username ? result.receiver : result.sender;
      const data = {
        matchId: req.params.matchId,
        status: result.status,
        matchUser
      };
      res.render('matches/matches', data);
    })
    .catch(next);
});

module.exports = router;
