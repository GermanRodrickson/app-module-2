'use strict';

const express = require('express');
const router = express.Router();
const Match = require('../models/matches');

router.get('/', (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect('/');
  }

  Match.find({
    $and: [
      {status: 'accepted'},
      {$or: [
        { sender: req.session.currentUser._id },
        { receiver: req.session.currentUser._id }]}
    ]})
    .populate('receiver sender')
    .then((result) => {
      const matchUsernames = result.map(results => {
        return results.sender.username === req.session.currentUser.username ? results.receiver.username : results.sender.username;
      });
      const data = {
        matches: result,
        usernames: matchUsernames
      };
      res.render('profile/profile', data);
    });
});

module.exports = router;
