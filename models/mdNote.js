'use strict';

const mongoose = require("mongoose");
const Schema   = mongoose.Schema;


const mdNoteSchema = new Schema({
  title: { type: String, required: true },
  content: String,
},
{
  timestamps:true
});

const MdNote = mongoose.model('MdNote', mdNoteSchema);



module.exports = MdNote;