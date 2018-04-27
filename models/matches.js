'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const matchesSchema = new Schema({
  sender: {
    type: ObjectId,
    ref: 'User'
  },
  receiver: {
    type: ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected']
  },
  spot: {
    type: ObjectId,
    ref: 'Spot'
  }
});

const Matches = mongoose.model('Match', matchesSchema);

module.exports = Matches;
