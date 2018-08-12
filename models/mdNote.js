'use strict';

const mongoose = require("mongoose");
const Schema   = mongoose.Schema;


const mdNoteSchema = new Schema({
  title: { type: String, required: true },
  content: String
});

const MdNote = mongoose.model('MdNote', mdNoteSchema);

module.exports = MdNote;