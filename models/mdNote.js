'use strict';

const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const mdNoteSchema = new Schema({
  title: 
    { 
      type: String, 
      required: true 
    },
  content: String,
  book_id: ObjectId,
  owner_id:
    { 
      type: ObjectId, 
      ref: 'User',
    },
  pinned: Boolean,
    },
  {
    timestamps: true
  }
);

const MdNote = mongoose.model('MdNote', mdNoteSchema);

module.exports = MdNote;