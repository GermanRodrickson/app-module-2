'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['Women', 'Men'],
    required: true
  },
  interestedin: {
    type: String,
    enum: ['Women', 'Men', 'Both'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  picture: {
    type: String
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
