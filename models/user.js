'use strict';

const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const userSchema = new Schema({
  password: { type: String, required: true },
  email: { type: String, required: true},
  
  settings : {
    editView: {type: Boolean, default: false },
    htmlView:  {type: Boolean, default: true },
    autoSave:  {type: Boolean, default: false},
    preview:  {type: Boolean, default: false},
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

