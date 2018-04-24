'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spotSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      required: true
    },
    coordinates: [Number]
  }
});

// spotSchema.index({ location: '2dsphere' }); ASK TAS WHYYYYYYYYY

const Spot = mongoose.model('Spot', spotSchema);

module.exports = Spot;
