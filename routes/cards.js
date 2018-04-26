'use strict';

const express = require('express');
const router = express.Router();
const Match = require('../models/matches');
require('mongoose-query-random');
const User = require('../models/users');

router.get('/', (req, res, next) => {
  const userId = req.session.currentUser._id;
  if (req.session.currentUser) {
    Match.find({
      status: {$ne: 'accepted'}
    })
      .then(result => {
        const userIdToExclude = result.map(results => {
          if (results.sender.toString() === userId) {
            return results.receiver;
          }
        });

        userIdToExclude.push(userId);

        return User.find({
          _id: {$nin: userIdToExclude}
        })
          .then(result => {
            const userLength = result.length;
            const randomUser = result[Math.floor(Math.random() * userLength)];
            const data = { userId: randomUser._id, username: randomUser.username };

            res.render('cards/cards', data);
          })
          .catch(next);
      });
  } else {
    res.redirect('/auth/login');
  }
});

// MATCH REQUESTS

router.post('/:userId', (req, res, next) => {
  // check if the user is logged in
  const choice = req.body.choice === 'yes';

  Match.findOne({
    $and: [
      { receiver: req.session.currentUser._id },
      { sender: req.params.userId }
    ]
  })
    .then(result => {
      if (result) {
        result.status = choice ? 'accepted' : 'rejected';
        return result.save().then(() => {
          if (choice) {
            res.redirect(`/matches/${result._id}`);
          } else {
            res.redirect('/cards');
          }
        });
      } else {
        let newStatus = choice ? 'pending' : 'rejected';
        const match = new Match({
          sender: req.session.currentUser._id,
          receiver: req.params.userId,
          status: newStatus
        });
        return match.save().then(() => {
          res.redirect('/cards');
        });
      }
    })
    .catch(next);
});

module.exports = router;
