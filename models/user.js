'use strict';

const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true},
  MdBooks  : { type: ObjectId, ref: 'MdBooks' },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

