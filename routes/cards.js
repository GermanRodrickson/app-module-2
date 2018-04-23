'use strict';

const express = require('express');
const router = express.Router();
const Match = require('../models/matches');

router.get('/', (req, res, next) => {
  if (req.session.currentUser) {
    res.render('cards/cards');
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
        }

        // If we are rejected, we go back to the cards page.
        if (result.status === 'rejected') {
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

  }
});

module.exports = router;
