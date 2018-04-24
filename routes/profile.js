'use strict';

const express = require('express');
const router = express.Router();
const Match = require('../models/matches');

router.get('/', (req, res, next) => {
  Match.find({
    $and: [
      {status: 'accepted'},
      {$or: [
        { sender: req.session.currentUser._id },
        { receiver: req.session.currentUser._id }]}
    ]})
    .then((result) => {
      const data = {
        name: result.sender !== req.session.currentUser.username || result.sender !== req.session.currentUser.username

      };

      // if result.receiver = req.ses.cur.id
      // data.match = receiver
      // data.match = sender

      res.render('profile/profile', data);
    });
});

module.exports = router;
