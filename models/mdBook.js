'use strict';

const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const mdBookSchema = new Schema({
  title: { 
    type: String, 
    required: true 
  },
  owner_id: { 
    type: ObjectId, 
    ref: 'User',
  },
  mdNotes: 
    [{ 
      type: ObjectId, 
      ref: 'MdNotes' 
    }],

  }, 
  {
    timestamps:true
  }
);

const MdBook = mongoose.model('MdBook', mdBookSchema);

module.exports = MdBook;