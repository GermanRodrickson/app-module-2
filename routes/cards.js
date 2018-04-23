'use strict';

const express = require('express');
const router = express.Router();
const Match = require('../models/matches');

router.get('/', (req, res, next) => {
  res.render('cards/cards');
});

// Reject

router.post('/:receiverId/no', (req, res, next) => {
  const criteria = {
    receiver: req.session.currentUser._id
  };
  Match.find(criteria).then(result => {
    if (!result) {
      const match = new Match({
        sender: req.session.currentUser._id,
        receiver: req.params.receiverId,
        status: 'rejected'
        // spot: objetid del usuario aceptado
      })
        .save();
    }
    res.redirect('/cards');
  })
    .catch(next);
});

// Accept

router.post('/:receiverId/yes', (req, res, next) => {
  const criteria = {
    receiver: req.session.currentUser._id,
    status: 'pending'
  };
  Match.find(criteria).then(result => {
    if (!result) {
      const match = new Match({
        sender: req.session.currentUser._id,
        receiver: req.params.receiverId,
        status: 'pending'
        // spot: objetid del usuario aceptado
      });

      match.save()
        .then(() => {
          res.redirect('/cards');
        });
    } else if (result.status === 'pending') {
      result.status = 'accepted';
      // res.something!
    }
  })
    .catch(next);
});

module.exports = router;
