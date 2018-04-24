'use strict';

const express = require('express');
const router = express.Router();
const Match = require('../models/matches');
require('mongoose-query-random');
const User = require('../models/users');

router.get('/', (req, res, next) => {
  if (req.session.currentUser) {
    User.find()
      .then((result) => {
        const userLength = result.length;
        const randomUser = result[Math.floor(Math.random() * userLength)];
        const data = {
          userId: randomUser._id,
          username: randomUser.username
        };
        res.render('cards/cards', data);
      })
      .catch(next);
  } else {
    res.redirect('/auth/login');
  }
});

// MATCH REQUESTS

router.post('/:receiverId', (req, res, next) => {
  const choice = req.body.choice === 'yes';

  if (choice) { // If user chooses YES
    Match.find({receiver: req.session.currentUser._id})
      .then((result) => {
        // If there is no result, create a new match with pending status.
        if (!result) {
          const match = new Match({
            sender: req.session.currentUser,
            receiver: req.params.receiverId,
            status: 'pending'
          });
          match.save()
            .then(
              res.redirect('/cards')
            );
          return;
        }

        // If we are rejected, we go back to the cards page.
        if (result.status === 'rejected') {
          result.receiver = req.session.currentUser;
          res.redirect('/cards');
          return;
        }

        // If we have a pending request, accept it and set our name in the match database.
        if (result.status === 'pending') {
          result.status = 'accepted';
          result.receiver = req.session.currentUser;

          // res.redirect(); <-- REDIRECT TO MATCH INFO
        }
      });
  } else { // If user chooses NO
    Match.find({ receiver: req.session.currentUser._id })
      .then((result) => {
      // If no request, create match with 'rejected' status.
        if (!result) {
          const match = new Match({
            sender: req.session.currentUser,
            receiver: req.params.receiverId,
            status: 'rejected'
          })
            .save()
            .then(
              res.redirect('/cards')
            );
          return;
        }
        // Change pending request to rejected
        if (result.status !== 'accepted') {
          result.receiver = req.session.currentUser;
          result.status = 'rejected';
          res.redirect('/cards');
        }
      });
  } // MECAGONTÓ
});

module.exports = router;
